const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');
const productsMenuTemplate = require('../views/products/menu');

const emailSender = require('./book');


const router = express.Router();

router.get('/', async (req, res) => {
  
  res.send(productsIndexTemplate());
});

router.get('/menu', async (req, res) => {
  const products = await productsRepo.getAll();
  const categories = getCategories(products);
  const filteredMenu = categories.includes('all') ? categories : ['all', ...categories];
  res.send(productsMenuTemplate({ products, filtered_menu: filteredMenu }));
});

router.post('/search', async (req, res) => {
  const {title} = req.body
  
  const products = await productsRepo.getOneTitle(title);
  
  res.send({products});
});

router.get('/category/:category', async (req, res) => {
  const itemCategory = req.params.category;
  const products = await productsRepo.getAll();

  if (itemCategory === 'all') {
    res.redirect('/menu');
  } else {
    const displayMenu = products.filter(item => item.category === itemCategory);
    const categories = getCategories(products);
    const filteredMenu = categories.includes('all') ? categories : ['all', ...categories];
    res.send(productsMenuTemplate({ products: displayMenu, filtered_menu: filteredMenu }));
  }
});

function getCategories(products) {
  return products.reduce((values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  }, []);
}

module.exports = router;
