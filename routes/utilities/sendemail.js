const nodemailer = require("nodemailer");


// async..await is not allowed in global scope, must use a wrapper
module.exports =  ({email,subject,message,html}) => {
  
const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  service:'gmail',
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'adudaniel097@gmail.com',
    pass: 'tbxhqziybbiwturo'
  }
});



let details = 
   {
    from: 'adudaniel097@gamil.com', // sender address
    to:email , // list of receivers
    subject: subject, 
    text: message, 
    html: html, 
  }

console.log(details)
/* 
 
  // send mail with defined transport object
    transporter.sendMail( details, (err) => {
    if (err) {
      console.log("it has an error" ,err);
    } else {
    console.log("Message sent: %s", );


  } 
})
 */
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

