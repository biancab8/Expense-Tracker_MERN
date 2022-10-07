import express, { response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors);      //to allow http requests from outside of server
dotenv.config(); 


app.get("/", (req, res) => {
    res.send("Hello World");
})




//connect to DB & start server
mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.igfw9cr.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("successfullly connected to mongoDB");
    app.listen(4000, () => {console.log("server running on port 4000")});
})
.catch((error) => console.log("Could not connect to mongoDB. Error: "+ error));
    



