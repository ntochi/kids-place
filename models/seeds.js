const mongoose = require('mongoose');
const Product = require('./product');
const Comment = require('./comment');

// Array of seed data model
const productData = [
    {
        // * 1
        title: "Winter Jacket",
        price: "30",
        image: "https://images.unsplash.com/photo-1584367369853-8b966cf223f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps ",
    },
    {
        // * 2
        title: "Basic Tee",
        price: "30",
        image:"https://images.unsplash.com/photo-1578878799601-d40c1b42d86c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
    {
        title: "Skater Dress",
        price: "30",
        image: "https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
    {
        title: "Floral Dress",
        price: "30",
        image: "https://images.unsplash.com/photo-1510025369388-f613ec4bc10b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
    {
        title: "Vacation Tee",
        price: "30",
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",

        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
    {
        title: "Art Play Tee",
        price: "30",
        image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
    {
        title: "Plaid Shirt",
        price: "30",
        image: "https://images.unsplash.com/photo-1502810217690-b2aa88e35100?ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
    {
        title: "Floral Swing Romper",
        price: "30",
        image: "https://images.unsplash.com/flagged/photo-1571530765629-4efdab448a6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
    {
        title: "Twinning Set",
        price: "30",
        image: "https://images.unsplash.com/flagged/photo-1562088440-ee50e79b2f98?ixlib=rb-1.2.1&auto=format&fit=crop&w=743&q=80",
        description: "Jelly-o jelly toffee macaroon ice cream muffin. I love icing caramels chocolate marzipan tiramisu muffin apple pie gingerbread. Bonbon halvah jelly apple pie candy canes brownie lemon drops. Bear claw liquorice gummi bears biscuit icing cotton candy oat cake. Cupcake pastry marzipan jelly beans I love jelly beans. I love jelly chocolate cake liquorice chupa chups fruitcake I love lemon drops dessert. I love tootsie roll apple pie I love sugar plum tiramisu topping sesame snaps",
    },
]

// Compile seed data into a function
function seedDB(){
    // Remove all products & comments
    Product.deleteMany({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("removed products!");
            Comment.deleteMany({}, function(err){
                if (err) {
                    console.log(err);
                } else {
                    console.log("removed comments!");
                    //Add a few products
                    productData.forEach(seed => {
                        Product.create(seed, function(err, product){
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("added a product!")
                                //Add a few comments
                                Comment.create(
                                    {
                                        text: "My child's favourite clothing!", 
                                        author: "Bernice"
                                    }, function(err, comment){
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        product.comments.push(comment);
                                        product.save();
                                        console.log("created new comment!");
                                    }
                                });
                            }
                        });
                    });
                }  
            });
        }
    });
}

module.exports = seedDB;

