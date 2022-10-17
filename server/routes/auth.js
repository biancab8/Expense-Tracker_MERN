import { Router } from  "express";
import User from "../models/User.js"
import bcrypt  from "bcrypt"

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
            //hash the password with bcrypt
            const saltRounds = 10;
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hashedPassword = await bcrypt.hashSync(password, salt); 
            //create new user instance
            const newUser = User({
                email: email, 
                firstName: firstName, 
                lastName: lastName,
                password: hashedPassword
            });
            //save user to db
            await newUser.save(); 
            res.status(201).json({message: "User was created successfully."}) //201=created ok
        }
    })


    //store new user in DB
    
    // res.json({message: "registering...."})
})

export default router; 