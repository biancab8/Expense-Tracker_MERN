//3:41

//DB connect -> /database
//DB models -> /models
//API -> /routes
//api calls with fetch()
//hashing password with bcrypt
//create token for signed-in user with JWT jason web token
// -> store in front end cookies with js-cockie
//create protected routes (can only access when logged in) with passport-jwt

import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import transactionRoutes from "./routes/transactions.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import connectDB from "./database/mongoDB.js";
import passport from "passport";
import passportConfig from "./config/passport.js";

const app = express();
app.use(cors());      //to allow http requests from outside of server
app.use(bodyParser.json()); //using jsons in http requests 
app.use(passport.initialize());
passportConfig(passport);

//APIs
app.use("/transactions", transactionRoutes);      
app.use("/auth", authRoutes); 
app.use("/user", userRoutes);





//connect to DB & start server
///call async function with await keyword   await connectDB() or use .then to access its value after...connectDB().then(...)
connectDB()
.then(app.listen(4000, () => {console.log("server running on port 4000")}))




    



