const express = require('express')
const { spawn } = require('child_process');


const cartsRepo = require('../repositories/carts')
const productsRepo = require('../repositories/products')
const ordersRepo = require('../repositories/orders')

const cartShowTemplate = require('../views/cart/show')
const checkoutOverlayTemplate = require('../views/cart/debitCardOverlay')
const fom = require('../views/cart/fom')
const sucessTemplate = require('../views/cart/sucesspage')
const failureTemplate = require('../views/cart/failurepage')

const toastModule = require('../views/utilities/toasts')
const runPythonEmailScript = require('./utilities/runPythonScript')
const getRandomDate = require('./utilities/getRandomDate');
const generateUniqueCartId = require('./utilities/getRandomId');
const { log } = require('console');



const router = express.Router()





function deleteItemById(jsonData) {
  const updatedItems = jsonData.items.filter((item) => item.id !== null);
  
  const updatedJson = {
    ...jsonData,
    items: updatedItems,
  };
  return updatedJson;
}


function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}
router.use(errorHandler);




// In-memory cache for fetched products
const productCache = new Map();

// Function to fetch a product, with caching
async function getProductWithCaching(productId) {
  if (productCache.has(productId)) {
    return productCache.get(productId);
  }

  try {
    const product = await productsRepo.getOne(productId);
    if (product) {
      // Cache the product for 5 minutes (adjust the cache time as needed)
      productCache.set(productId, product);
      setTimeout(() => productCache.delete(productId), 5 * 60 * 1000);
      return product;
    }
    return null;
  } catch (err) {
    console.error('Error fetching product:', err);
    return null;
  }
}

// Function to update the total price of the cart
async function updateTotal(cartItems) {
  let totalPrice = 0;

  for (const item of cartItems) {
    const product = await getProductWithCaching(item.id);

    if (!product) {
      // If the product is not found, skip to the next item
      console.log('Product not found for item:', item);
      continue;
    }

    totalPrice += item.quantity * product.price;
  }

  return parseFloat(totalPrice.toFixed(2));
}

router.post('/cart/products', async (req, res) => {
  try {
    const cartId = req.session.cartId || generateUniqueCartId();
    let cart = await cartsRepo.getOne(cartId);

    if (!cart) {
      cart = await cartsRepo.create({
        items: [{ id: null, quantity: 0 }],
        total: 0,
        id: cartId,
      });
      console.log('Cart created');
    }
    const existingItem = cart.items.find((item) => item?.id === req.body.productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.items.push({ id: req.body.productId, quantity: 1 });
    }

    cart.total = await updateTotal(cart.items);
    console.log('Total price:', cart.total);

    const successToast = toastModule.success({ message: 'Added To Cart' });
    const quantity = cart.items.length;

    res.send({ successToast, quantity });

    // Move this line here to update the cart after sending the response
    await cartsRepo.update(cart.id, cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});







router.get('/cart', async (req, res) => {
  try {
    let cart;
    if (!req.session.cartId) {
      req.session.cartId = generateUniqueCartId;
       cart = await cartsRepo.create({ items: [], total: 0,  id: req.session.cartId }); 
       console.log(cart);
       console.log(' cart created');
    } else {
      cart = await cartsRepo.getOne(req.session.cartId);
      console.log(cart);
      console.log('getone');
    }
    console.log(req.session.id)
    if (!req.session.cartId) {
      return res.redirect('/');
    } 
  
    
    if (cart.items[0] == 0){
      cart.total=0
      }
    else {
      for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);
        item.product = product;
        
      }
      const totalPrice = cart.items.reduce((total, item) => {
        let quantity = item.product ? item.product.price * item.quantity : 0;
        total = total + quantity;
        
        return parseFloat(total.toFixed(2))
      }, 0);
      cart.total=totalPrice
      await cartsRepo.update(cart.id, cart);
      
    }

    res.send(cartShowTemplate({ items: cart.items, totalPrice }));
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/cart/deleteItem', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/');
    }
    
    const cart = await cartsRepo.getOne(req.session.cartId);
    console.log('Before deletion:', cart); 
    
    const foundItem = cart.items.filter(item => req.body.productId !== item.id);
    console.log('Found items:', foundItem); // Log the items after filtering
    
    cart.items = foundItem;
    
    await cartsRepo.update(req.session.cartId, { items: cart.items });
    console.log('After deletion:', cart); // Log the cart after deletion
    
    res.redirect('/cart')
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/cart/checkout', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/');
    }
    
    const cart = await cartsRepo.getOne(req.session.cartId);
    const total = cart.total
    
    res.send(checkoutOverlayTemplate({total:total}))
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


let success = true;

router.get('/cart/payment-response', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    if (success) {
      cart.items = [];
      await cartsRepo.update(req.session.cartId, { items: cart.items });

      res.send(successTemplate({ msg: `We received your purchase request;<br/> we'll be in touch shortly!`,redirect:'Menu',redirect_link:'/book'  }));
    } else {
      res.send(failureTemplate({ msg: `Your purchase request failed;<br/> Please try again later` }));
    }

    // Reset the success variable for the next request
    success = true;
  } catch (err) {
    res.status(500).send(err);
  }
});






router.post('/cart/payment', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/');
    }

    const { card_name, address, email } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);
    const randomDay = getRandomDate();

    const virProduct = await Promise.all(
      cart.items.map(async (item) => {
        const product = await productsRepo.getOne(item.id);
        item.product = product;
        return item;
      })
    );

    const order = {
      card_name,
      address,
      email,
      product: virProduct.map((item) => `${item.product.title} => ${item.product.price}`).join('\n'),
      date: randomDay,
      total: cart.total,
    };
    const orders = await ordersRepo.create({ order, user_order_id: req.session.cartId })

    const orderDetails = {
      card_name: order.card_name,
      address: order.address,
      email: order.email,
      product: order.product,
      date: order.date,
      total: order.total.toFixed(2),
    };

    // Create an email data object
    const emailData = {
      email: orderDetails.email,
      subject: 'Your CAFE order has shipped',
      message: `
        ${orderDetails.card_name},
        Thank you for your order from CAFE. If you have questions about your order, you can email us at ${orderDetails.email}.
        Your shipping information is below, confirming the goods in person when receiving, non-quality issues will not be returned after unpacking. Thank you again for your patience.
        Your Shipment # for Order ${orders.id}
        Billing Info
        - Card Name ${orderDetails.card_name}
        - Address ${orderDetails.address}
        - Email ${orderDetails.email}
        - Products ${orderDetails.product}
        - Date ${orderDetails.date}
        - Total $${orderDetails.total}
      `,
    };

    // Convert the email data object to JSON string
    const jsonString = JSON.stringify(emailData);
    try {
      // Call the Python helper function and handle the result
      const pythonScriptResult = await runPythonEmailScript(jsonString);
      console.log('Python script output:', pythonScriptResult);
     
    } catch (err) {
     
      console.error('Error executing Python script:', err);
      success = false;
     
      res.redirect('/cart/payment-response');
      return;
    }

      cartsRepo
        .update(req.session.cartId, { userCardDetails: req.body })
        .then(() => {
          res.redirect('/cart/payment-response');
        })
        .catch((err) => {
          console.error(err);
          success = false;
          res.redirect('/cart/payment-response');
        });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}); 





//change item quantity
router.post('/cart/change', async(req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }
  const { changes } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);
  const items = []
   for (const change of changes) {
    const { productId, quantity } = change;
    const intQuantity = parseInt(quantity)
   const existingItem = cart.items.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity = intQuantity;
    }    
    items.push(existingItem);
  } 
  await cartsRepo.update(cart.id, { items }); 
  async function updateTotal(cartItems) {
    const productsPromises = cartItems.map(async (item) => {
      const product = await productsRepo.getOne(item.id);
      item.product = product;
      return item.quantity * product.price;
    });
  
    const quantitiesTotal = await Promise.all(productsPromises);
    const totalPrice = quantitiesTotal.reduce((total, quantityPrice) => total + quantityPrice, 0);
    return parseFloat(totalPrice.toFixed(2));
  }
  const total = await updateTotal(cart.items);
  
for (let item of virProduct){
  const product = await productsRepo.getOne(item.id)
  item.product = product
}
   await cartsRepo.update(cart.id, {total}); 
   res.redirect('/cart')
});




module.exports = router;



