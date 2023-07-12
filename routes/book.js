const express = require('express')
const BookRepository = require('../repositories/book')
const productsBookTemplate = require('../views/products/book');
const emailSender = require('./utilities/sendemail');
const sucessTemplate = require('../views/cart/sucesspage')
const failureTemplate = require('../views/cart/failurepage')
const router = express.Router()





router.get('/book', async (req, res) => {
  res.send(productsBookTemplate({}));
});




router.post('/book', async (req, res) => {
  try {
    const {user_book_details} = req.body
    book = await BookRepository.create({ user_book_details, user_book_id: req.session.cartId });
    res.send(sucessTemplate({msg:`you have been scheduled;<br/> you'll receive your details soon!`}))
    const message = `you have been scheduled;<br/> you'll receive your details soon!`
    res.send(failureTemplate({msg: `Your booking request failed;<br/> Please try again later`}))
    emailSender({useremail,message})
    emailSender().catch(console.error);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});














module.exports = router;



