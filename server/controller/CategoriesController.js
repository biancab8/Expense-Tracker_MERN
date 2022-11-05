import User from "../models/User.js";


export const deleteCategory = async (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id}, 
        {$pull : {categories: {_id: req.params.id}}},
        {new: true},
        function(err, updatedUser){
            if(!err){
                res.json({user: updatedUser})
            } else {
                console.log(err)
            }
        }
    )
}

// updated user or previous????????????????