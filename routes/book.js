const express = require('express')
const { spawn } = require('child_process');


const BookRepository = require('../repositories/book')
const productsBookTemplate = require('../views/products/book');
const generateUniqueCartId = require('./utilities/getRandomId');

const sucessTemplate = require('../views/cart/sucesspage')
const failureTemplate = require('../views/cart/failurepage')

const runPythonEmailScript = require('./utilities/runPythonScript')

const router = express.Router()





router.get('/book', async (req, res) => {
  res.send(productsBookTemplate({}));
});




router.post('/book', async (req, res) => {
  try {
    const user_book_details = req.body; // Corrected to access from req.body
    const bookId = req.session.cartId || generateUniqueCartId;
    const book = await BookRepository.create({ user_book_details});
    book.id = bookId;
    
    const emailData = {
      email: user_book_details.email,
      subject: ' Your Table Reservation is Confirmed!',
      message: `
      Dear ${user_book_details.name},
      We hope this email finds you well. We are delighted to inform you that your table reservation at CAFE has been successfully booked.
      Reservation Details:
      Booking ID- ${book.id}
      Date- ${user_book_details.date}
      Time- ${user_book_details.time}
      Number of Guests- ${user_book_details.no_of_people}
      Special Request- ${user_book_details.special_request}
      User ID- ${bookId}

      If you have any questions or need to make any changes to your reservation, feel free to contact us at 09079730611 or reply to this email. We are here to assist you with anything you might require.
      Once again, thank you for choosing CAFE for your dining experience. We are eagerly anticipating your visit and are confident that you will have a fantastic time with us.

      See you soon!
      Best regards,

      CAFE
        
      `,
    };
    // Convert the email data object to JSON string
    const jsonString = JSON.stringify(emailData);
    try {
      console.log('try');
      // Call the Python helper function and handle the result
      const pythonScriptResult = await runPythonEmailScript(jsonString);
      console.log('Python script output:', pythonScriptResult);
     
    } catch (err) {
      console.error('Error executing Python script:', err);
      return;
    }
    res.send(sucessTemplate({ msg: `you have been scheduled;<br/> you'll receive your details soon!`,redirect:'Book',redirect_link:'/book' })); 

    
  } catch (err) {
    console.error(err);
    res.send(failureTemplate({msg: `Your booking request failed;<br/> Please try again later`,redirect:'Book',redirect_link:'/book' }))   
  }
});


module.exports = router;

