const express = require("express");
const router = express.Router();
const Product = require('../models/product');


// INDEX: display a list of all products
router.get("/shop", async (req, res) => {
     // Get all products from database
    try {
        const products = await Product.find({});
        res.render("products/index", { products });
    } catch (e) {
        console.log("There was an error:", e); 
    }
});

// SHOW: show more info about a product
router.get("/shop/:id", (req, res) => {
    // Find product with ID
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
        if (err) {
            console.log(err);
        } else {
            res.render("products/show", { product: foundProduct });
        }
    });
});

module.exports = router;