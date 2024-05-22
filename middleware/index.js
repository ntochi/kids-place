const Product = require("../models/product");
const Comment = require("../models/comment");
const middleware = {};

middleware.isLoggedIn = (req, res, next) => {
  // If user is not authenticated:
  if (!req.isAuthenticated()) {
    // Store url the user is requesting, then redirect
    req.session.returnTo = req.originalUrl
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/login');
  }
  
  next();
}

middleware.isCommentAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;

  const comment = await Comment.findById(commentId);
  console.log(comment);

  // If user is not the comment author:
  if (!comment.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/shop/${id}`);
  }

  next();
}

module.exports = middleware;