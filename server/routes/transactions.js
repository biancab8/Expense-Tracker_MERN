//handle all requests to .../transactions

import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";
import * as TransactionController from "../controller/TransactionController.js";

//init router instance
const router = Router();

//handle get requests to /transactions/
router.get("/", passport.authenticate("jwt", {session: false}), TransactionController.findTransaction
)

//handle post requets to /transactions/
router.post("/", TransactionController.createTransaction);

//handle delete requests to /transactions
router.delete("/:id", TransactionController.deleteTransaction)

//handle update requests to /transactions
router.patch("/:id", TransactionController.updateTransaction)


export default router;