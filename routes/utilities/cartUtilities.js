const cartsRepo = require('../../repositories/carts')
const productsRepo = require('../../repositories/products')
const ordersRepo = require('../../repositories/orders')

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
  
  
  
  
  
  const productCache = []
  
  async function getProductWithCaching(productId) {
    if (productCache[productId]) {
      return productCache[productId];
    }
  
    try {
      const product = await productsRepo.getOne(productId);
      if (product) {
        productCache[productId] = product;
        setTimeout(() => delete productCache[productId], 5 * 60 * 1000);
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
    if (!cartItems || typeof cartItems[Symbol.iterator] !== 'function') {
      return parseFloat(totalPrice.toFixed(2));
    }
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
  
  
  
  async function checkAndRemoveInvalidItems(cart) {
    if (!cart.items || typeof cart.items[Symbol.iterator] !== 'function') {
      cart.items = []; // Set cart.items to an empty object if it is not iterable
      return;
    }
  
    const validItems = [];
    for (const item of cart.items) {
      const product = await getProductWithCaching(item.id);
      if (product) {
        item.product = product;
        validItems.push(item);
      }
    }
    cart.items = validItems;
  }
  
  module.exports = {
    checkAndRemoveInvalidItems,
    updateTotal,
    getProductWithCaching,
    errorHandler,
  }