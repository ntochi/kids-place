const express = require("express");
const router = express.Router();
const Product = require('../models/product');
const Comment = require('../models/comment');
const middleware = require("../middleware");

// NEW: display form to make a new comment
router.get("/shop/:id/comments/new", middleware.isLoggedIn, function (req, res){
    // Find product by ID
    Product.findById(req.params.id, function(err, foundProduct){
        if (err) {
            console.log(err);
        } else {
			res.render("comments/new", {product: foundProduct});
        }
    })
});

// CREATE: add new comment to database
router.post("/shop/:id/comments", middleware.isLoggedIn, function(req, res){
    // Find product by ID
    Product.findById(req.params.id, function(err, foundProduct){
        if (err) {
            console.log(err);
        } else {
            // Create new comment
            Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err)
				} else {
					//Associate comment with product, then redirect
					foundProduct.comments.push(comment);
					foundProduct.save();
					res.redirect("/shop/" + foundProduct._id);
				}
			});
        }
    })

});


module.exports = router;