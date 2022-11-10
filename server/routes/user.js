import { Router } from "express";
import passport from "passport";
import * as UserController from '../controller/UserController.js';

const router = Router();

//handle requests to .../user
router.get("/", passport.authenticate("jwt", {session: false}), UserController.getUser);

export default router; 