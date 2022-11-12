//logic for API routes
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

  function numToMonth(num) {
    const date = new Date();
    date.setMonth(num - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

export const findTransactions = async (req, res) => {
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  let category = req.query.category;
  let dateConditions = {};
  let categoryCondition = {};

  //if filter by date or category requests, add those to conditions:
  if (startDate && endDate) {
    startDate = new Date(req.query.startDate + "T00:00:00");
    endDate = new Date(req.query.endDate + "T23:59:59");
    dateConditions = { date: { $gte: startDate, $lte: endDate } };
  }
  if (category) {
    category = mongoose.Types.ObjectId(category);
    categoryCondition = { category_id: category };
  }

  Transaction.aggregate(
    [
      {
        $match: { user_id: req.user._id },
      },
      {
        $match: categoryCondition, //filter by category id
      },
      {
        $match: dateConditions, //if date range specified, filter by date range
      },
      {
        $sort: { date: -1, createdAt: -1 },
        //also sort by createdAt so that same date but more recently created will be at top
        //descending
      },
      {
        //STAGE 1 -> CREATE GROUPS
        //group by month/year -> creates 1 document per (month+year)
        $group: {
          _id:  
          
          {$concat: [{
            $let: {
              vars: {
                monthsInString: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
              },
              in: {$arrayElemAt: ['$$monthsInString',  {$month: "$date"}]
            },}}," ", {$toString: {$year: "$date"}}  ]},
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
          totalExpenses: { $sum: "$amount" },
        },
      },
      {
        //STAGE 2 -> WORK ON THE GROUP LEVEL, ie sort the groups not the individual transactions
        //sort the groups by their _id which is the year+month
        $sort: { _id: -1 }, //descending ie newest at top
      },
    ],
    function (err, groupedTransactions) {
      if (err) {
        console.log(err);
      } else {
        console.log("--------------------------------------------------------------")
        console.log(groupedTransactions)
        res.json({ data: groupedTransactions });
      }
    }
  );
};

export const createTransaction = async (req, res) => {
  const { amount, description, date, category_id } = req.body;
  const transaction = new Transaction({
    amount: amount,
    description: description,
    date: date,
    user_id: req.user._id,
    category_id: category_id,
  });
  await transaction.save();
  res.json({ message: "Successfully added transaction to DB" });
};

export const deleteTransaction = async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ mesage: "success" });
};

export const updateTransaction = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "success" });
};
