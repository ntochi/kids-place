// Import modules
const bodyParser = require("body-parser");
const mongoose 	 = require("mongoose");
const session    = require("express-session");
const passport   = require("passport");
const localStrategy = require ("passport-local");
const express    = require("express");
const app        = express();


// Import models
const Product = require("./models/product");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require('./seeds');


// Import routes
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/products");
const commentRoutes = require("./routes/comments");


// Middleware configuration
const port = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/doremas_place", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
seedDB();


// Auth configuration
app.use(session({
	secret: 'Cinnamon buns',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes configuration
app.use(indexRoutes);
app.use(productRoutes);
app.use(commentRoutes);




app.listen(port, () => console.log("Dorema's Place Server Has Started!"));