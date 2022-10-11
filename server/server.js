//1:44:23

//DB connect -> /database
//DB models -> /models
//API -> /routes

import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import transactionRoutes from "./routes/transactions.js";
import connectDB from "./database/mongoDB.js";

const app = express();
app.use(cors());      //to allow http requests from outside of server
app.use(bodyParser.json()); //using jsons in http requests 
app.use("/transactions", transactionRoutes);        //transactions API






//connect to DB & start server
///call async function with await keyword   await connectDB() or use .then to access its value after...connectDB().then(...)
connectDB()
.then(app.listen(4000, () => {console.log("server running on port 4000")}))




    



