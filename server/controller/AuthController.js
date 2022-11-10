import User from "../models/User.js"
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken";

const categories = [
    { label: "Travel", icon: {name: "travel", default: true} },
    { label: "Shopping", icon: {name: "shopping", default: true} },
    { label: "Health", icon: {name: "health", default: true }},
    { label: "Bills", icon: {name: "bills", default: true }},
    { label: "Leisure", icon: {name: "leisure", default: true}},
    { label: "Other", icon: {name: "other", default: true}},
  ];


  export const registerUser = (req, res) => {
    //get data from req
    const {email, firstName, lastName, password} = req.body;
    //check if use already has an account 
    User.findOne({email: email}, async function(err, foundUser){
        if(err){
            console.err("Could not check if user exists. Error: " + err);
        } else if (foundUser){
            res.status(409).json({message: "User already exists."}); //409 = conflict
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
    const {email, password} = req.body;
    //check if user exists
    User.findOne({email: email}, async function(err, foundUser){
        if(err){
            console.err("Could not check if user exists. Error: " + err);
        } else if(foundUser){
            const matched = await bcrypt.compare(password, foundUser.password);
            if(!matched){
                res.status(406).json({message: "Incorret email or password."});
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
            console.log("User credentials not found.")
        }
    })
}