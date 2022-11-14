import User from "../models/User.js";

export const deleteCategory = async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { categories: { _id: req.params.id } } },
    { new: true },
    function (err, updatedUser) {
      if (!err) {
        res.json({ user: updatedUser });
      } else {
        console.log(err);
      }
    }
  );
};

export const addCategory = async (req, res) => {
  const { label, icon } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { categories: { label: label, icon: icon } } },
    { new: true },
    function (err, updatedUser) {
      if (!err) {
        res.json({ user: updatedUser });
      } else {
        console.log(err);
      }
    }
  );
};

export const updateCategory = async (req, res) => {
  const { label, icon } = req.body;
  const categories = req.user.categories; 
  const id = req.params.id;
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        categories: categories.map((category) => {
          if (category._id == id) {
            return { label, icon };
          }
          return category;
        }),
      },
    },
    {new: true},
    function (err, updatedUser) {
      if (!err) {
        res.json({ user: updatedUser });
      } else {
        console.log(err);
      }
    });
};



