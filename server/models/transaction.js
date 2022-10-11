import mongoose from "mongoose";

//create Schema
const transactionSchema = new mongoose.Schema({
    amount: Number, 
    description: String, 
    date: {
        type: Date, 
        default: new Date()
    },
    createdAt: {
        type: Date, 
        default: Date().now
    }
})

//create model
const Transaction = mongoose.model("Transaction", transactionSchema); 

export default Transaction; 