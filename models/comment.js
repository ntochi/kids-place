const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});


// Compile into a model
module.exports = mongoose.model("Comment", commentSchema);