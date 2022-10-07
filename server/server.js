//1:02

import express, { response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Transaction from "./models/transaction.js";


const app = express();
app.use(cors());      //to allow http requests from outside of server
app.use(bodyParser.json()); //using jsons in http requests 
dotenv.config(); 


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/transactions", (req, res) => {
    Transaction.find({}, function (err, transactions){
        if(err){
            console.err(err);
        } else {
            res.json({data: transactions});
        }
    }).sort({date: "descending"})
}
)

app.post("/transactions", async (req, res) => {
    const {amount, description, date} = req.body; 
    const transaction = new Transaction({
        amount: amount, 
        description: description,
        date: date
    });
    await transaction.save(); 
    res.json({message: "Successfully added transaction to DB"});

});




//connect to DB & start server
mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.igfw9cr.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("successfullly connected to mongoDB");
    app.listen(4000, () => {console.log("server running on port 4000")});
})
.catch((error) => console.log("Could not connect to mongoDB. Error: "+ error));
    



