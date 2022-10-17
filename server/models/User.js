import mongoose from "mongoose";

//create Schema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    email: {type: String, required: true}, 
    password: {type: String, required: true},
}, {
    timestamps: true
})

//create model
const User = mongoose.model("User", userSchema); 

export default User; 