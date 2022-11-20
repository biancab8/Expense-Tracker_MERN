import { Router } from "express";

import * as AuthController from "../controller/AuthController.js";

const router = Router();

//handle requests to /auth

//AuthController.registerUser is a REFERENCE to a function bc need callback....
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

export default router;
