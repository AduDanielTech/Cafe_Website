const express = require('express');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requirepasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser
} = require('./validators');
const { handleErrors } = require('./middlewares');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

async function createUser (req, res) {
  const { email, password,} = req.body;
  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  return res.send('Account created!!!');
}
router.post(
  '/signup',
  [requireEmail, requirePassword,],
  handleErrors(signupTemplate),
  async (req, res) => {
    createUser(req, res)
    res.redirect('/signin');
  }
  
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.redirect('/signin')
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});


router.post(
  '/signin',
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.redirect('/admin/products')
  }
);

module.exports = router;
  