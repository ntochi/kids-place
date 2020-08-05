const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: String,
});



// Compile into a model
module.exports = mongoose.model("Product", productSchema);