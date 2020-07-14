const express = require("express");
const router = express.Router();



// INDEX: show all items
router.get("/boys", function (req, res){
    res.render("boy");
});



module.exports = router;