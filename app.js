if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// Import modules
const express    = require('express');
const path = require('path');
const mongoose 	 = require('mongoose');
const session    = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const MongoDBStore = require('connect-mongo')(session);
const { check } = require('express-validator');
const passport   = require('passport');
const localStrategy = require ('passport-local');
const app = express();

// Import models
const Product = require("./models/product");
const Cart = require("./models/cart");
const Comment = require("./models/comment");
const User = require("./models/user");

// Import routes
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/products");
const commentRoutes = require("./routes/comments");
// const cartRoutes = require("./routes/carts");

// MongoDB configuration
const dbUrl = process.env.DB_URL;

//! Remote Database URL 
// const dbUrl = 'mongodb://0.0.0.0:27017/kids-place';

mongoose.connect(dbUrl, {
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false
}).then(() => {
	console.log("Database Connected");

}).catch(error => {
	console.log('ERROR:', error.message);
});


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session & MongoStore configuration
const secret = process.env.SECRET || 'Cinnamon buns';

const store = new MongoDBStore({
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
	saveUninitialized: false,
	cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));

// Flash & Passport configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Routes configuration
app.use(indexRoutes);
app.use(productRoutes);
app.use(commentRoutes);
// app.use(cartRoutes);


const port = process.env.PORT || 3008;
app.listen(port, () => {
	console.log(`Kid's Place app serving on port ${port}`)
});
