//logic for API routes
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

// export const findTransactions = async (req, res) => {
//     Transaction.find({user_id: req.user._id}, function (err, transactions){
//         if(err){
//             console.err(err);
//         } else {
//             //won't actually be sent back before rest of function finished. (bc not saying return res.json())

//             res.json({data: transactions});
//         }
//     }).sort({date: "descending", createdAt: "descending"})
//     //also sort by createdAt so that same date but more recently created will be at top
// }

export const findTransactions = async (req, res) => {
    let startDate; 
    let endDate; 
    let category = req.query.category;
    //if filter by date requested, add dates to conditions
    if(req.query.startDate){
        startDate = new Date(req.query.startDate+"T00:00:00"); 
        endDate = new Date(req.query.endDate+"T23:59:59"); 
    }
    if(category){
        category = mongoose.Types.ObjectId(category);
    }
let dateConditions = {}; 
    if(startDate && endDate){
        // console.log(startDate)
        dateConditions = {date: {$gte: startDate, $lte: endDate}};
    }
    let categoryCondition ={};
    if(category){
        categoryCondition = {category_id: category};
    }
    console.log(categoryCondition)
    Transaction.aggregate([
        //only look at transactions for this user, and sort all with newest at top
        // conditions,
        {
            $match: {user_id: req.user._id},
            $match: dateConditions, //if date range specified, pass in dates
            $match: categoryCondition, //filter by category id
        },
        

        
        {
            $sort: {date: -1, createdAt: -1}
            //also sort by createdAt so that same date but more recently created will be at top
            //descending
        }, 

        {
            //STAGE 1 -> CREATE GROUPS
            //group by month/year -> creates 1 document per month+year 
            $group: {
                _id: {year: {$year: "$date"}, month: {$month: "$date"}}, 
                //now looks like this: {"data":[{"_id":{"year":2022,"month":11}},{"_id":{"year":2022,"month":10}}]}
                //for each group, create a list with all of its transactions 
                transactions: {
                    $push: {
                        amount: "$amount",
                        description: "$description", 
                        date: "$date",
                        type: "$type", 
                        _id: "$_id",
                        user_id: "$user_id",
                        category_id: "$category_id",
                    },
                    
                },
                //for each group, sum up the total expenses
                totalExpenses: { $sum: "$amount"}, 
            },
        },
        {
            //STAGE 2 -> WORK ON THE GROUP LEVEL, ie sort the groups not the individual transactions 
            //sort the groups by their _id which is the year+month
            // { $sort: { _id: 1}}, 
            $sort: {_id: -1}, //descending ie newest at top
        },
    ], function(err, groupedTransactions){
        if(err){
            console.log(err);
        } else {
            res.json({data: groupedTransactions});
        }
    })

}


// export const findTransactions = async (req, res) => {
//     // const startDate = new Date(req.params.startDate).setHours(0,0,0); 
//     // const endDate = new Date(req.params.endDate).setHours(23,59,59); 
//     //set hours to start/end of day or it will compare the hours too
//     const cat = mongoose.Types.ObjectId('6366f33e435ff024acf18c7e');
//     Transaction.find({user_id: req.user._id,  category_id: cat }, function (err, transactions){
//         if(err){
//             console.err(err);
//         } else {
//             res.json({data: transactions});
//         }
//     }).sort({date: "descending", createdAt: "descending"})
//     //also sort by createdAt so that same date but more recently created will be at top
// }

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

















