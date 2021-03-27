const express = require("express");
const router = express.Router();
const Product = require('../models/product');


// INDEX: display a list of all products
router.get("/shop", async (req, res) => {
    try {
        const products = await Product.find({});
        res.render("products/index", { products });
    } catch (err) {
        console.log(`There was an error: ${err}`); 
    }
});

// SHOW: show more info about a product
router.get("/shop/:id", async (req, res) => {
    try {
        // Find product with ID, then populate comments & authors
        const product = await Product.findById(req.params.id).populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).populate('author');
        
        console.log(product);

        if (!product) {
            req.flash('error', 'Cannot find that product!');
            return res.redirect('/shop');
        }

        res.render('products/show', { product });
    } catch (err) {
        console.log(`There was an error: ${err}`); 
    }
});

module.exports = router;