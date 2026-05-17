const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        // required: [true, "Name required"]
    },
    email: {
        type: String,
        // required: [true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        // required: [true, "Password required"]
    }
});
module.exports = mongoose.model("User", userSchema);