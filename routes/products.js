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













module.exports = router;