if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// Import modules
const mongoose 	 = require('mongoose');
const session    = require('express-session');
const flash    = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const { check } = require('express-validator');
const passport   = require('passport');
const localStrategy = require ('passport-local');
const express    = require('express');
const app        = express();

// Import models
const Product = require("./models/product");
const Cart = require("./models/cart");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require('./models/seeds');

// Import routes
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/products");
const commentRoutes = require("./routes/comments");
const cartRoutes = require("./routes/carts");

// MongoDB configuration
const dbUrl =  process.env.DB_URL || "mongodb://localhost:27017/doremas_place";

mongoose.connect(dbUrl, {
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false
}).then(() => {
	console.log("Database Connected");
}).catch(err => {
	console.log('ERROR:', err.message);
});


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
seedDB();


const secret = process.env.SECRET || 'Cinnamon buns';

const store = new MongoStore({
	url: dbUrl,
	secret,
	touchAfter: 24 * 60 * 60 // lazy session update time period in seconds
});

store.on("error", function (e) {
	console.log("Session Store Error", e);
})

const sessionConfig = {
	store,
	secret,
	resave: false,
	saveUninitialized: false
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes configuration
app.use(indexRoutes);
app.use(productRoutes);
app.use(commentRoutes);
app.use(cartRoutes);


const port = process.env.PORT || 3007;
app.listen(port, () => {
	console.log(`Kid's Place Serving on port ${port}`)
});
