import { Router } from "express";
import passport from "passport";

const router = Router();

//to .../user
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({user: req.user});
})


export default router; 