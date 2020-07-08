//Import modules
const bodyParser = require("body-parser"),
      express    = require("express"),
      port       = process.env.PORT || 3000,
      app        = express();


const indexRoutes = require("./routes/index"),
      shopRoutes = require("./routes/shop"),
      boyRoutes = require("./routes/boys"),
      girlRoutes = require("./routes/girls");




//Middleware configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));




//Routes configuration
app.use(indexRoutes);
app.use(shopRoutes);
app.use(boyRoutes);
app.use(girlRoutes);




app.listen(port, () => {
    console.log("Dorema's Place Server Has Started!");
});