import { Router } from  "express";

import * as AuthController from "../controller/AuthController.js";

const router = Router();

//handle post requets to /auth/register
//AuthController.registerUser is a REFERENCE to a function bc need callback....
router.post("/register", AuthController.registerUser);

//handle post request to auth/login
router.post("/login", AuthController.loginUser);


export default router; 