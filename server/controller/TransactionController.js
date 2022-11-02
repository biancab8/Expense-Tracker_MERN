//logic for API routes

import Transaction from "../models/Transaction.js";

export const findTransaction = async (req, res) => {
    Transaction.find({}, function (err, transactions){
        if(err){
            console.err(err);
        } else {
            //won't actually be sent back before rest of function finished. (bc not saying return res.json())
            res.json({data: transactions});
        }
    }).sort({date: "descending"})
}

export const createTransaction = async (req, res) => {
    const {amount, description, date} = req.body; 
    const transaction = new Transaction({
        amount: amount, 
        description: description,
        date: date
    });
    await transaction.save(); 
    res.json({message: "Successfully added transaction to DB"});

}

export const deleteTransaction = async (req, res) => {
    await Transaction.deleteOne({_id: req.params.id});
    res.json({mesage: "success"});
}

export const updateTransaction = async(req, res) => {
    await Transaction.updateOne({_id: req.params.id}, {$set: req.body});
    res.json({message: "success"});
}