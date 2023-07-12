const express = require('express')
const cartsRepo = require('../repositories/carts')
const productsRepo = require('../repositories/products')
const ordersRepo = require('../repositories/orders')
const cartShowTemplate = require('../views/cart/show')
const checkoutOverlayTemplate = require('../views/cart/debitCardOverlay')
const sucessTemplate = require('../views/cart/sucesspage')
const failureTemplate = require('../views/cart/failurepage')
const toastModule = require('../views/utilities/toasts')
const sendemail = require('./utilities/sendemail')
const router = express.Router()

router.post('/cart/products', async (req, res) => {
  try {
    let cart;
    if (!req.session.cartId) {
      cart = await cartsRepo.create({ items: [] });
      req.session.cartId = cart.id;
      cart.total = 0;
    } else {
      cart = await cartsRepo.getOne(req.session.cartId);
    }
    
    
    if (!cart) {
      cart = await cartsRepo.create({ items: [] });
      req.session.cartId = cart.id;
      cart.total = 0;
    }
    
    const existingItem = cart.items.find(item => item.id === req.body.productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    
    await cartsRepo.update(cart.id, { items: cart.items });
    let total = 0
     for (let item in cart.items){
      total += await cart.items[item].quantity
    }

    const successToast = toastModule.success({ message: 'Added To Cart' });
    res.send({successToast, total});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// receive a get request to  show all items in cart

router.get('/cart', async (req, res) => {
  try {
    if (!req.session.cartId) {
      cart = await cartsRepo.create({ items: [] });
      req.session.cartId = cart.id;
      cart.total = 0;
    } else {
      cart = await cartsRepo.getOne(req.session.cartId);
    }
  
    if (!req.session.cartId) {
      return res.redirect('/');
    } 
  
    for (let item of cart.items) {
      const product = await productsRepo.getOne(item.id);
      item.product = product;

    }
  
    const totalPrice = cart.items.reduce((total, item) => {
      let quantity = item.product ? item.product.price * item.quantity : 0;
      total = total + quantity;

      return parseFloat(total.toFixed(2))
    }, 0);
  
    await cartsRepo.update(cart.id, { total: totalPrice });
  
    res.send(cartShowTemplate({ items: cart.items, totalPrice }));
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// delete item

router.post('/cart/deleteItem', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);
    console.log('Before deletion:', cart); // Log the cart before deletion

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

router.get('/cart/payment-response', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/');
    }
    const cart = await cartsRepo.getOne(req.session.cartId);

    let success = true
   
    if(success) {
    cart.items = []
    await cartsRepo.update(req.session.cartId, { items: cart.items });

      res.send(sucessTemplate({msg:`We received your purchase request;<br/> we'll be in touch shortly!`}))
    }else{
       res.send(failureTemplate({msg: `Your purchase request failed;<br/> Please try again later`}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/cart/payment', async (req, res) => {
  try {
    if (!req.session.cartId) {
      return res.redirect('/');
    }
    
    const {card_name,address, email} = req.body
    const cart = await cartsRepo.getOne(req.session.cartId);
   

   
    

   function getRandomDate() {
  
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const randomDayOffset = Math.floor(Math.random() * 7);
  const randomDayOfMonth = currentDayOfMonth + randomDayOffset;
  currentDate.setDate(randomDayOfMonth);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
    const randomDay = getRandomDate();

    const virProduct = await Promise.all(
      cart.items.map(async (item) => {
        const product = await productsRepo.getOne(item.id);
        item.product = product;
        return item;
      })
    );
    const order ={
      card_name,
      address,
      email,
      product: virProduct.map((item) => `${item.product.title} => ${item.product.price}`)
      .join('\n') ,
      date:randomDay,
      total:cart.total,
    }
    
    let orders ;
    

    const orderDetails = {
      card_name: order.card_name,
      address: order.address,
      email: order.email,
      product: order.product,
      date: order.date,
      total: order.total.toFixed(2),
    };
    
    orders = await ordersRepo.create({ order, user_order_id: req.session.cartId });
    const message = `
      ${orderDetails.card_name},
    
      Thank you for your order from CAFE. If you have questions about your order, you can email us at ${orderDetails.email}.
    
      Your shipping information is below, confirming the goods in person when receiving, non-quality issues will not be returned after unpacking. Thank you again for your patience.
    
      Your Shipment # for Order ${orders.id}
    
      Billing Info
      - Card Name: ${orderDetails.card_name}
      - Address: ${orderDetails.address}
      - Email: ${orderDetails.email}
      - Products: ${orderDetails.product}
      - Date: ${orderDetails.date}
      - Total: $${orderDetails.total}
    `;
    const htmlDocument = `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your CAFE order has shipped</title>
</head>
<body>
  <h2>${orderDetails.card_name},</h2>
  
  <p>Thank you for your order from CAFE. If you have questions about your order, you can email us at ${orderDetails.email}.</p>
  
  <p>Your shipping information is below. Please confirm the goods in person when receiving. Non-quality issues will not be returned after unpacking. Thank you again for your patience.</p>
  
  <h3>Your Shipment # for Order ${orders.id}</h3>
  
  <h4>Billing Info</h4>
  <ul>
    <li><strong>Card Name:</strong> ${orderDetails.card_name}</li>
    <li><strong>Address:</strong> ${orderDetails.address}</li>
    <li><strong>Email:</strong> ${orderDetails.email}</li>
    <li><strong>Products:</strong> ${orderDetails.product}</li>
    <li><strong>Date:</strong> ${orderDetails.date}</li>
    <li><strong>Total:</strong> $${orderDetails.total}</li>
  </ul>
</body>
</html>

    `
    const subject= `Your CAFE order has shipped`
    const emailData = {
      email: orderDetails.email,
      subject,
      message,
      html : htmlDocument,
    };
 
    sendemail({email,subject,message})
    await cartsRepo.update(req.session.cartId, { userCardDetails : req.body}).then()
    return res.redirect('/cart/payment-response');
   
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

  const virProduct = cart.items
  async function updateTotal() {
    for (let item of virProduct){
      const product = await productsRepo.getOne(item.id)
      item.product = product
    }
    const totalPrice = virProduct.reduce(async(total, item) =>{
      
      let quantityPrice = await item.quantity *  item.product.price
     
      total = await  total + quantityPrice

      return parseFloat(total.toFixed(2))
      
  }, 0)

  return totalPrice
}
 
const total = await updateTotal()
for (let item of virProduct){
  const product = await productsRepo.getOne(item.id)
  item.product = product
}
   await cartsRepo.update(cart.id, {total}); 
   res.redirect('/cart')
});




module.exports = router;



