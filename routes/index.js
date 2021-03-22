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
    res.render('user/user', { currentUser: req.user });
});

// Register route
router.get('/register', (req, res) => {
    res.render('user/register');
});

// Handle register logic
router.post('/register', check('password').trim(), (req, res) => {
    var newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, (err, newUser) => {
        if (err) {
            // req.flash('error', err.message);
            console.log(err);
            res.redirect('/register');
        }
        passport.authenticate('local') (req, res, () => {
            // req.flash('success', 'Kids Place!')
            res.redirect('/user');
        });
    });
});

// Login route
router.get('/login', (req, res) => {
    res.render('user/login');
});

// Handle login logic
router.post('/login', passport.authenticate('local', 
    { 
        successRedirect: '/user', 
        failureRedirect: '/login'
    }), (req, res) => {

});

//Logout route
router.get('/logout', (req, res) => {
	//destroy all the user data in the session
	req.logout();
    req.flash('success', 'You are now logged out')
	res.redirect("/login");
});


module.exports = router;