//handle all requests to .../transactions

import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";

//init router intsance
const router = Router();

//handle get requests to /transactions/
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Transaction.find({}, function (err, transactions){
        if(err){
            console.err(err);
        } else {
            //won't actually be sent back before rest of function finished. (bc not saying return res.json())
            res.json({data: transactions});
        }
    }).sort({date: "descending"})
}
)

//handle post requets to /transactions/
router.post("/", async (req, res) => {
    const {amount, description, date} = req.body; 
    const transaction = new Transaction({
        amount: amount, 
        description: description,
        date: date
    });
    await transaction.save(); 
    res.json({message: "Successfully added transaction to DB"});

});

//handle delete requests to /transactions
router.delete("/:id", async (req, res) => {
    await Transaction.deleteOne({_id: req.params.id});
    res.json({mesage: "success"});
})

//handle update requests to /transactions
router.patch("/:id", async(req, res) => {
    await Transaction.updateOne({_id: req.params.id}, {$set: req.body});
    res.json({message: "success"});
})


export default router;