const mongoose = require('mongoose');
const Product = require('./models/product');

// Array of seed data model
const productData = [
    {
        // * 1
        title: "Skater Dress",
        price: "$30",
        image: "https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        // * 2
        title: "Basic Tee",
        price: "$30",
        image:"https://images.unsplash.com/photo-1578878799601-d40c1b42d86c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        title: "Winter Jacket",
        price: "$30",
        image: "https://images.unsplash.com/photo-1584367369853-8b966cf223f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        title: "Floral Dress",
        price: "$30",
        image: "https://images.unsplash.com/photo-1510025369388-f613ec4bc10b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        title: "Vacation Tee",
        price: "$30",
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",

        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        title: "Art Play Tee",
        price: "$30",
        image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        title: "Plaid Shirt",
        price: "$30",
        image: "https://images.unsplash.com/photo-1502810217690-b2aa88e35100?ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        title: "Floral Swing Dress",
        price: "$30",
        image: "https://images.unsplash.com/flagged/photo-1571530765629-4efdab448a6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
    {
        title: "Twinning Set",
        price: "$30",
        image: "https://images.unsplash.com/flagged/photo-1562088440-ee50e79b2f98?ixlib=rb-1.2.1&auto=format&fit=crop&w=743&q=80",
        description: "Gummies oat cake chocolate cake jelly croissant gummi bears wafer I love gummies.",
    },
]

// Compile seed data into a function
function seedDB(){
    Product.deleteMany({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("removed products!")
            // Add a few products
            productData.forEach(seed => {
                Product.create(seed, function(err, product){
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a product!")
                    }
                });
            });
        }
    });
}

module.exports = seedDB;

