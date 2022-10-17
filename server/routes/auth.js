import { Router } from  "express";
import User from "../models/User.js"

const router = Router();

//handle post requets to /auth/register
router.post("/register", (req, res) => {
    //get data from req
    console.log(req.body)
    const {email, firstName, lastName, password} = req.body;
    //check if use already has an account 
    User.findOne({email: email}, async function(err, user){
        if(err){
            console.err("Could not check if user exists. Error: " + err);
        } else if (user){
            res.status(409).json({message: "User already exists."}); //409 = conflict
        } else {
            const newUser = User({
                email: email, 
                firstName: firstName, 
                lastName: lastName,
                password: password
            });
            await newUser.save(); 
            res.json({message: "Success"})
        }
    })
    //hash the password
    //store new user in DB
    
    // res.json({message: "registering...."})
})

export default router; 