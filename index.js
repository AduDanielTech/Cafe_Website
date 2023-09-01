const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const bookRouter = require('./routes/book');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['lkasld235j'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define your routes
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);
app.use(bookRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
