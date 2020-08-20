const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});


// Adds auth methods to user model
userSchema.plugin(passportLocalMongoose);

// Compile into a model
module.exports = mongoose.model("User", userSchema);