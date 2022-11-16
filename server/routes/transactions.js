//handle all requests to .../transactions

import { Router } from "express";
import * as TransactionController from "../controller/TransactionController.js";

const router = Router();

//handle get requests to /transactions/

router.get("/", TransactionController.findTransactions)
router.post("/", TransactionController.createTransaction);
router.delete("/:id", TransactionController.deleteTransaction)
router.patch("/:id", TransactionController.updateTransaction); 
router.patch("/byCategory/:oldId/:newId", TransactionController.updateTransactionsbyCategory); 
router.get("/categoryTotals", TransactionController.getTotalExpensesByCategory);

export default router;