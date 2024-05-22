const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const passport = require("passport");
const User = require('../models/user');

// Landing page route
router.get('/', (req, res) => {
  res.render('landing');
});

// User profile route
router.get('/user', (req, res) => {
  res.render('user/user', {currentUser: req.user});
});

// Register route
router.get('/register', (req, res) => {
  res.render('user/register');
});

// Handle register logic
router.post('/register', check('password').trim(), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    
    // Login user after registering
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash('success', `Welcome to Kid's Place!`);
      res.redirect('/shop');
    })
  } catch(err) {
    req.flash('error', err.message); 
    res.redirect('register');
  }
});

// Login route
router.get('/login', (req, res) => {
    res.render('user/login');
});

// Handle login logic
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  req.flash('success', 'Welcome Back!');
  
  const redirectUrl = req.session.returnTo || '/user';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

//Logout route
router.get('/logout', (req, res) => {
	req.logout();
  req.flash('success', "Goodbye!");
	res.redirect("/login");
});

module.exports = router;