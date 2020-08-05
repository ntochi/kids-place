const express = require("express");
const router = express.Router();
const Product = require('../models/product');


// INDEX: display a list of all products
router.get("/shop", function (req, res){
    // Get all products from database
    Product.find({}, function(err, allProducts){
        if (err) {
            console.log(err);
        } else {
			res.render("products/index", {product: allProducts});
        }
    })
});

// SHOW: show more info about a product
router.get("/shop/:id", function (req, res){
    // Find product by ID
    Product.findById(req.params.id, function(err, foundProduct){
        if (err) {
            console.log(err);
        } else {
            res.render("products/show", {product: foundProduct});
        }
    });

});













module.exports = router;