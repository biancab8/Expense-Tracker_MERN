import mongoose from "mongoose";

//create Schema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: ["First name is required"]}, 
    lastName: {type: String, required: ["Last name is required"]}, 
    email: {type: String, required: ["Email is required"]}, 
    password: {type: String, required: ["Password is required"]},
    categories: [{label: String, icon: String}],
}, {
    timestamps: true
})

//create model
const User = mongoose.model("User", userSchema); 

export default User; 