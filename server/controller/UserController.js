import User from "../models/User.js";


export const getUser = (req, res) => {
    res.json({user: req.user});
}