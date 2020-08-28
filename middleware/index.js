const Product = require("../models/product");
const Comment = require("../models/comment");

const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}


module.exports = middlewareObj;