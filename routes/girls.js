const express = require("express");
const router = express.Router();



// INDEX: show all items
router.get("/girls", function (req, res){
    res.render("girl");
});



module.exports = router;