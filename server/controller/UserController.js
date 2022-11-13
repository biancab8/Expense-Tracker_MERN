import User from "../models/User.js";

export const getUser = (req, res) => {
  res.json(req.user);
};
