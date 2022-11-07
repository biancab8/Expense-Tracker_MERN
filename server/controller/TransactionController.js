//logic for API routes

import Transaction from "../models/Transaction.js";

export const findTransaction = async (req, res) => {
    Transaction.find({user_id: req.user._id}, function (err, transactions){
        if(err){
            console.err(err);
        } else {
            //won't actually be sent back before rest of function finished. (bc not saying return res.json())

            res.json({data: transactions});
        }
    }).sort({date: "descending", createdAt: "descending"})
    //also sort by createdAt so that same date but more recently created will be at top
}

export const filterByDate = async (req, res) => {
    const startDate = new Date(req.params.startDate).setHours(0,0,0); 
    const endDate = new Date(req.params.endDate).setHours(23,59,59); 
    //set hours to start/end of day or it will compare the hours too

    Transaction.find({user_id: req.user._id, date: {$gte: startDate, $lte: endDate}}, function (err, transactions){
        if(err){
            console.err(err);
        } else {
            res.json({data: transactions});
        }
    }).sort({date: "descending", createdAt: "descending"})
    //also sort by createdAt so that same date but more recently created will be at top
}

export const createTransaction = async (req, res) => {
    const {amount, description, date, category_id} = req.body; 
    const transaction = new Transaction({
        amount: amount, 
        description: description,
        date: date,
        user_id: req.user._id,
        category_id: category_id,
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