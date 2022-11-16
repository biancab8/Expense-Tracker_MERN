//3:41

//DB connect -> /database
//DB models -> /models
//API -> /routes
//api calls with fetch()
//hashing password with bcrypt
//create token for signed-in user with JWT jason web token
// -> store in front end cookies with js-cockie
//create protected routes (can only access when logged in) with passport-jwt

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./database/mongoDB.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import routes from "./routes/index.js";
import * as dotenv from "dotenv";

dotenv.config(); 

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());      //to allow http requests from outside of server
app.use(bodyParser.json()); //using jsons in http requests 
app.use(passport.initialize());
passportConfig(passport);

//APIs
app.get("/", (req, res) => {res.send("Welcome to the server.")});
app.use("/", routes);




//connect to DB & start server
///call async function with await keyword   await connectDB() or use .then to access its value after...connectDB().then(...)
connectDB()
.then(app.listen(PORT, () => {console.log("server running on port 4000")}))




    



