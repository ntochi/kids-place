const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isCommentAuthor } = require("../middleware");
const Product = require('../models/product');
const Comment = require('../models/comment');


// NEW: display form to make a new comment
router.get("/shop/:id/comments/new", isLoggedIn, async (req, res) => {
    try {
        // Find product by ID, then render template
        const { id } = req.params;
        const product = await Product.findById(id)
        res.render("comments/new", { product });
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
});


// CREATE: add new comment to database
router.post("/shop/:id/comments", isLoggedIn, async (req, res) => {
    try {
        // Find product by ID & create new comment from parsed form
        const { id } = req.params;
        const product = await Product.findById(id)
        const comment = new Comment(req.body.comment)
        comment.author = req.user._id;
        // Push new comment to product, then save
        product.comments.push(comment);
        await comment.save();
        await product.save();
        // req.flash('success', 'Created new review!');
        res.redirect(`/shop/${product._id}`);
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
});

// DESTROY- delete a review, then redirect
router.delete('/shop/:id/comments/:commentId', isLoggedIn, isCommentAuthor, async (req, res) => {
    try {
        const { id, commentId } = req.params;
        await Product.findByIdAndUpdate(id, { $pull: { comments: commentId } });
        await Comment.findByIdAndDelete(commentId);
        // req.flash('success', 'Successfully deleted review')
        res.redirect(`/shop/${id}`);
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
})


module.exports = router;