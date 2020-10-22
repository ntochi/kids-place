const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");


// Display shopping cart page
router.get("/cart", function(req, res){
    res.render("shopping-cart/cart")
});

// Get cart contents
router.get("/add-to-cart/:id", function(req, res){
    var cart = new Cart(req.session.cart ? req.session.cart: {items: {}});

    // Find product by ID
    Product.findById(req.params.id, function(err, foundProduct){
        if (err) {
            console.log(err);
        } else {
            // Add product to cart, then redirect
            cart.add(foundProduct, foundProduct._id);
            req.session.cart = cart;
            res.redirect("/shop/" + foundProduct._id);
            console.log(req.session.cart);
        }
    });
    
});


// Create a shopping cart
router.post("/cart", function(req, res){

});

// Put a product in the cart
router.post("/cart", function(req, res){

});


// Get cart contents
router.get("/cart/:id", function(req, res){

});

// Remove items from cart
router.delete("/cart/:cart-id/:product-id", function(req, res){

});


// !Temp checkout
router.get("/checkout", function(req, res){
    res.render("shopping-cart/checkout")
});

// Checkout cart
router.post("/cart/:id/checkout", function(req, res){

});

module.exports = router;