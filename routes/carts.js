const express = require("express");
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');



// Show shopping cart with all producta
router.get('/cart', (req, res) => {
    res.render("shopping-cart/cart");
})


// Handle add-to-cart logic
router.post('/add-to-cart/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let cart = new Cart ( req.session.cart ? req.session.cart : {} );
    
        await Product.findById(id, (product) => {
            cart.add(product, id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/shop')
        });

    } catch (error) {
        console.log('There was an error:', error.message); 
        res.redirect('/');
    }
});

// // * TEST
//     // Retrieve product id data from form
//     const { id } = req.params;
//     await Product.findById(id);
//     // Print out id of product
//     console.log(id);
//     // Send success message
//     res.send('Product added to cart');

// router.post('/cart/products/:id', async (req, res) => {
//     // Figure out the cart logic
//     if(!req.session.cartID) {
//         // We don't have a cart, so we need to create one 
//         // and store the id on the req.session.cartiD property
//         const cart = new Cart ({ items: [] });
//         await cart.save();
//         console.log(cart);

//     } else {
//         // We have a cart, let's get it from the repository
//     }
//         // Either add new product to cart-items array
//         // OR increment quantity of existing product

// });


// Delete a particular product from shopping cart
router.delete('/', (req, res) => {
    
})


module.exports = router;