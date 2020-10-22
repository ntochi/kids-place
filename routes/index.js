const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user');

// Landing route
router.get("/", function (req, res){
    res.render("landing");
});

// User profile route
router.get("/user", function (req, res){
    res.render("user/user", {currentUser: req.user});
});

// Register route
router.get("/register", function (req, res){
    res.render("user/register");
});

// Handle register logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, newUser){
        if(err){
            console.log(err);
            res.redirect("/register");
         }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/user");
        });
    });});

// Login route
router.get("/login", function (req, res){
    res.render("user/login");
});

// Handle login logic
router.post("/login", passport.authenticate("local", {successRedirect: "/user", failureRedirect: "/login"}), function(req, res){

});

//Logout route
router.get("/logout", function(req, res){
	//destroy all the user data in the session
	req.logout();
	res.redirect("/login");
});


module.exports = router;