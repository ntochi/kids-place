// Import modules
const bodyParser = require("body-parser"),
      mongoose 	 = require("mongoose"),
      express    = require("express"),
      app        = express();


// Import models
const seedDB = require('./seed');

// Import routes
const indexRoutes = require("./routes/index"),
      productRoutes = require("./routes/products"),
      boyRoutes = require("./routes/boys"),
      girlRoutes = require("./routes/girls");


const port = process.env.PORT || 3000;



// Middleware configuration
mongoose.connect("mongodb://localhost:27017/doremas_place", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
seedDB();




// Routes configuration
app.use(indexRoutes);
app.use(productRoutes);
app.use(boyRoutes);
app.use(girlRoutes);




app.listen(port, () => console.log("Dorema's Place Server Has Started!"));