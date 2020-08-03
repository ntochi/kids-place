const express = require("express");
const router = express.Router();

//INDEX: display a list of all products
router.get("/shop", function (req, res){
    res.render("products/index");
});













module.exports = router;