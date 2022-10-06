import express, { response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors);
dotenv.config(); 

//connect to DB
try{
    await mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.igfw9cr.mongodb.net/?retryWrites=true&w=majority");
    console.log("successfullly connected to mongoDB");
} catch (err) {
    console.log("Could not connect to mongoDB. Error: "+err);
}


app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(4000, () => {console.log("server running on port 4000")});