const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name) {
            return res.status(400).json({ message : "Name required" });
        }
        if(!email) {
            return res.status(400).json({ message : "Email required" });
        }
        if(!password) {
            return res.status(400).json({ message : "Password required" });         
        }
        const exists = await User.findOne({email});
        if(exists) {
            return res.status(400).json({ message : "User already exists" });         
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        if(user){
            //maybe send back data?
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({message: "Invalid User Data"})
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user" });
    }
};
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({message : "Invalid Credentials"});
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error Authenticating User" });
    }
};
const getMe = async (req, res) => {
    try {
        const {_id, name, email} = await User.findById(req.user.id);
        res.status(200).json({
            id: _id,
            name: name,
            email: email,
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user data" });
    }
};

module.exports = {registerUser, loginUser, getMe};