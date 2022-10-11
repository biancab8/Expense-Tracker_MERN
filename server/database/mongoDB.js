import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config(); 

async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.igfw9cr.mongodb.net/?retryWrites=true&w=majority");
        // console.log("Successfully connect to mongo database.");
    } catch (err){
        console.error("Could not connect to mongo database. Error: " + err);
    }
}

export default connectDB;