const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');


const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const bookRouter = require('./routes/book');

const app = express();


app.use(express.static('public', { maxAge: '1h' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['lkasld235j']
  })
);
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);
app.use(bookRouter);
 
app.listen(3002, () => {
  console.log('running server on port: http://localhost:3002')
});
