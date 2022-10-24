const { user, thought } = require("../models")

// Get all users
const userController = {  
    getUsers(req, res) {
      user.find()
        .select("-__v")
        .then((dbUserData) => {
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
// Get single user
    getSingleUser(req, res) {
        user.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "Error has occured" })
            }
            res.json(dbUserData);
        })
        .catch((err)  => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// create new user
createUser(req, res) {
    user.create(req.body)
    .then((dbUserData) => {
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

// update user

updateUser(req, res) {
    user.findOneAndUpdate( { _id: req.params.userId }, {
        $set:req.body,
    },
    {
        runValidators: true,
        new: true,
    }
 )
    .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "Error has occured" });
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
// Delete a user and thoughts
deleteUser(req, res) {
    user.findOneAndDelete({ _id: req.params.userId })
    .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "Error has occured" });
        }
        // delete user's thougts
        return thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
    })
    .then(() => {
        res.json({ message: "Thought deleted."});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

// Add fiend

addFriend(req, res) {
    user.findOneAndUpdate( 
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.fiendId }},
        { new: true }
    )
    .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "Error has occured."});
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
// Remove a friend

removeFriend(req, res) {
    user.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId  }},
        { new: true }
    )
    .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "Error has occured."});
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
};

module.exports = userController;