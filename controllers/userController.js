const { User, Thought } = require("../models")

// Get all users
const userController = {  
    getUsers(req, res) {
      User.find()
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
        User.findOne({ _id: req.params.userId })
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
    User.create(req.body)
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
    User.findOneAndUpdate( { _id: req.params.userId }, {
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
// Delete a user and associated thoughts
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "Error has occured" });
        }
        // delete user's thougts
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
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
    User.findOneAndUpdate( 
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.fiendId }},
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
    User.findOneAndUpdate(
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