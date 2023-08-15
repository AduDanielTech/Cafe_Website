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
const {processWithSemaphore} = require('./utilities/manageRequestsHandling');
const {
  checkAndRemoveInvalidItems,
  updateTotal,
  getProductWithCaching,
  errorHandler,} = require('./utilities/cartUtilities');

const { log } = require('console');



const router = express.Router()



router.use(errorHandler);

router.post('/cart/products', async (req, res) => {
  await processWithSemaphore(async () => {
    try {
      const cartId = req.session.cartId || generateUniqueCartId;

      req.session.cartId = cartId
      let cart = await cartsRepo.getOne(cartId);

      if (!cart) {
        cart = await cartsRepo.create({
          items: [{ id: null, quantity: 0 }],
          total: 0,
          id: cartId,
        });
        console.log('Cart created');
      }

      if (!Array.isArray(cart.items)) {
        cart.items = [];
      }
  
      // Check if the product already exists in the cart
      const existingItem = cart.items.find((item) => item?.id === req.body.productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.items.push({ id: req.body.productId, quantity: 1 });
      }

      cart.total = await updateTotal(cart.items);
      console.log('Total price:', cart.total);
      log('hi')
      const successToast = toastModule.success({ message: 'Added To Cart' });
      const quantity = cart.items.length;

      res.send({ successToast, quantity });

      await cartsRepo.update(cart.id, cart);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
});



router.get('/cart', async (req, res) => {
  
  try {
    const cartId = req.session.cartId || generateUniqueCartId
    req.session.cartId = cartId
    let cart = await cartsRepo.getOne(cartId);
    if (!cart) {
      cart = await cartsRepo.create({
        items: [{ id: null, quantity: 0 }],
        total: 0,
        id: cartId,
      });
      console.log('Cart created');
    }
    checkAndRemoveInvalidItems(cart)
    cart.total = await updateTotal(cart.items);
    res.send(cartShowTemplate({ items: cart.items, totalPrice:cart.total }));
    await cartsRepo.update(cart.id, cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/cart/deleteItem', async (req, res) => {
  await processWithSemaphore(async () => { try {
    if (!req.session.cartId) {
      return res.redirect('/menu');
    }
    
    const cart = await cartsRepo.getOne(req.session.cartId);
    
    const foundItem = cart.items.filter(item => req.body.productId !== item.id);
    
    cart.items = foundItem;
    cart.total = await updateTotal(cart.items);
    
    res.redirect('/cart')
    await cartsRepo.update(req.session.cartId, { items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }})
});

router.get('/cart/checkout', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/menu');
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

      res.send(sucessTemplate({ msg: `We received your purchase request;<br/> we'll be in touch shortly!`,redirect:'Menu',redirect_link:'/book'  }));
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
router.post('/cart/change', async (req, res) => {
  await processWithSemaphore(async () => {
    try {
      
      if (!req.session.cartId) {
        return res.redirect('/menu');
      }


      const { changes } = req.body;
      const cart = await cartsRepo.getOne(req.session.cartId);
      const items = {};
      

      for (const change of changes) {
        const { productId, quantity } = change;
        const intQuantity = parseInt(quantity);
        const existingItem = cart.items.find(item => item.id === productId);
        if (existingItem) {
          existingItem.quantity = intQuantity;
        }
        // Update the 'items' object with the existing item
        items[productId] = existingItem;
      }

      cart.items = Object.values(items);
      cart.total = await updateTotal(cart.items);
      

      // Batch update the cart in the database
      await cartsRepo.update(cart.id, cart);

      console.log(cart);
      res.redirect('/cart');
    } catch (err) {
      res.status(500).send(err);
    }
  });
});




module.exports = router;



