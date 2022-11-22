import User from "../models/User.js"
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config(); 

const categories = [
    { label: "Travel", icon: {name: "travel", default: false} },
    { label: "Shopping", icon: {name: "shopping", default: false} },
    { label: "Health", icon: {name: "health", default: false }},
    { label: "Leisure", icon: {name: "leisure", default: false}},
    { label: "Groceries", icon: {name: "groceries", default: false}},
    { label: "Bills", icon: {name: "bills", default: false }},
    { label: "Other", icon: {name: "other", default: true}},
  ];


  export const registerUser = (req, res) => {
    //get data from req
    const {firstName, lastName, password} = req.body;
    let {email} = req.body; 
    email = email.toLowerCase();
    console.log(email)
    //check if use already has an account 
    User.findOne({email: email}, async function(err, foundUser){
        if(err){
            res.json({message: "Could not register user."})
        } else if (foundUser){
            res.status(409).json({message: "An account with this email already exists."}); //409 = conflict
        } else {
            //hash the password with bcrypt
            const saltRounds = 10;
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hashedPassword = await bcrypt.hashSync(password, salt); 
            //create new user instance
            const newUser = User({
                email: email, 
                firstName: firstName, 
                lastName: lastName,
                password: hashedPassword,
                categories: categories,
            });
            //save user to db
            await newUser.save(); 
            res.status(201).json({message: "User was created successfully."}) //201=created ok
        }
    })
}

export const loginUser = (req, res) => {
    let {email, password} = req.body;
    email = email.toLowerCase();
    console.log(email)
    //check if user exists
    User.findOne({email: email}, async function(err, foundUser){
        if(err){
            res.json({message: "User login failed."})
        } else if(foundUser){
            const matched = await bcrypt.compare(password, foundUser.password);
            if(!matched){
                res.status(401).json({message: "Incorrect email or password."});
            } else{ //paswords match
                //create JWT JSON Web Token
                const payload ={
                    username: email,
                    id: foundUser._id
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET);
                res.json({message: "successfully logged in", token: token, user:foundUser})
            }
        } else {
            res.status(401).json({message: "Incorrect email or password."});
        }
    })
}