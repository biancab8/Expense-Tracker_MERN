//handle all requests to .../transactions

import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";
import * as TransactionController from "../controller/TransactionController.js";

const router = Router();

//handle get requests to /transactions/

router.get("/", TransactionController.findTransactions)
router.post("/", TransactionController.createTransaction);
router.delete("/:id", TransactionController.deleteTransaction)
router.patch("/:id", TransactionController.updateTransaction) //update


export default router;