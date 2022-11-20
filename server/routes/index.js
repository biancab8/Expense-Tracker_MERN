import { Router } from "express";
import transactionRoutes from "./transactions.js";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import categoriesRoutes from "./categories.js";
import passport from "passport";

const router = Router();

router.use(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  transactionRoutes
);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  categoriesRoutes
);

export default router;
