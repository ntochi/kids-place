const express = require("express");
const router = express.Router();



//INDEX: show all items
router.get("/shop", function (req, res){
    res.render("shop");
});

// //SHOW: display more info about item
// router.get("/shop/:id", function (req, res){

// });



module.exports = router;