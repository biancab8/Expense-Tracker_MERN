//logic for API routes
import mongoose from "mongoose";
import Transaction from "../models/transaction.js";

export const createTransaction = async (req, res) => {
  const { amount, description, date, category_id } = req.body;
  const transaction = new Transaction({
    amount: amount,
    description: description,
    date: date,
    user_id: req.user._id,
    category_id: category_id,
  });
  try{
    await transaction.save();
    res.json({ message: "Successfully added transaction to DB" });
  } catch{
    res.json({message: "Could not create transaction."})
  }
};

export const deleteTransaction = async (req, res) => {
  try{
    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ mesage: "success" });
  } catch {
    res.json({message: "Could not delete transaction."})
  }
};

export const updateTransaction = async (req, res) => {
  try{
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "success" });
  } catch {
    res.json({message: "Could not update transaction."})
  }

};

export const findTransactions = async (req, res) => {
  let { startDate, endDate, category, timezone } = req.query;
  //if filter by date or category requested, add those conditions:
  let dateConditions = {};
  if (startDate && endDate) {
    startDate = new Date(req.query.startDate + "T00:00:00");
    endDate = new Date(req.query.endDate + "T23:59:59");
    dateConditions = { date: { $gte: startDate, $lte: endDate } };
  }
  let categoryCondition = {};
  if (category) {
    category = mongoose.Types.ObjectId(category);
    categoryCondition = { category_id: category };
  }

  // sub queries
  const monthDateQuery = {
    $concat: [
      {
        $let: {
          vars: {
            monthsInString: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
          in: {
            $arrayElemAt: [
              "$$monthsInString",
              { $subtract: [{ $month: {date: "$date", timezone: timezone} }, 1] },
            ],
          },
        }, //minus 1 for idx starting at 0
      },
      " ",
      { $toString: { $year: "$date" } },
    ]
  };

  Transaction.aggregate(
    [
      {
        $match: { user_id: req.user._id },
      },
      {
        $match: categoryCondition, //filter by category id
      },
      {
        $match: dateConditions, // filter by date range
      },
      {
        $sort: { date: -1, createdAt: -1 },
        //also sort by createdAt so that same date but more recently created will be at top
      },
      {
        //STAGE 1 -> CREATE GROUPS
        //group by month/year -> creates 1 document per (month+year)
        $group: {
          _id: monthDateQuery,
        //now looks like this: {"data":[{"_id":{"November 2022"},...]
          year: {$first: {$year: "$date"}},
          month: {$first: {$month: "$date"}},
          //for each group, create a list with all of its transactions
          transactions: {
            $push: {
              amount: "$amount",
              description: "$description",
              date: "$date",
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
        //STAGE 2 -> WORK ON THE GROUP LEVEL, ie sort the groups by their _id which is (year+month)
        $sort: {year: -1, month: -1}
      },
    ],
    function (err, groupedTransactions) {
      if (err) {
        res.json({message: "Could not fetch transactions."})
      } else {
        res.json({ data: groupedTransactions });

      }
    }
  );
};

export const updateTransactionsbyCategory = async (req, res) => {
  //find all transactions whose category id equals oldId, and update its category to newId
  const oldCategoryId = req.params.oldId;
  const newCategoryId = req.params.newId;
  Transaction.updateMany(
    { user_id: req.user._id, category_id: oldCategoryId },
    { category_id: newCategoryId },
    { new: true },
    function (err, updatedTransactions) {
      if (err) {
        res.json({message: "Could not update transactions."})
      } else {
        res.json({ message: "Successfully updated the transactions." });
      }
    }
  );
};

export const getTotalExpensesByCategory = async (req, res) => {
  //get total per category (for dates requested if applicable)
  let { startDate, endDate } = req.query;
  //if filter by date or category requested, add those conditions:
  let dateConditions = {};
  if (startDate && endDate) {
    startDate = new Date(req.query.startDate + "T00:00:00");
    endDate = new Date(req.query.endDate + "T23:59:59");
    dateConditions = { date: { $gte: startDate, $lte: endDate } };
  }
  Transaction.aggregate(
    [
      {
        $match: { user_id: req.user._id },
      },
      {
        $match: dateConditions, //if date range specified, filter by date range
      },
      {
        $group: {
          _id: "$category_id",
          totalExpenses: { $sum: "$amount" },
        },
      },
    ],
    function (err, categoryTotals) {
      if (err) {
        res.json({message: "Could not get transactions by category."})
      } else {
        res.json({ categoryTotals: categoryTotals });
      }
    }
  );
};
