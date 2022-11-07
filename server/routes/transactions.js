//handle all requests to .../transactions

import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";
import * as TransactionController from "../controller/TransactionController.js";

//init router instance
const router = Router();

//handle get requests to /transactions/
router.get("/", TransactionController.findTransaction)

router.get("/dateFilter/:startDate/:endDate", TransactionController.filterByDate);

router.post("/", TransactionController.createTransaction);


router.delete("/:id", TransactionController.deleteTransaction)

//handle update requests to /transactions
router.patch("/:id", TransactionController.updateTransaction)


export default router;