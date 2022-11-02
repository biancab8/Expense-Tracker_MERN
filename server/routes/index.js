
import { Router } from "express"; 
import transactionRoutes from "./transactions.js";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";

const router = Router(); 

router.use("/transactions", transactionRoutes);      
router.use("/auth", authRoutes); 
router.use("/user", userRoutes);


export default router; 