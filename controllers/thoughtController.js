const { read } = require("fs");
const { Thought, User } = require("../models");

// Get all thoughts
const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
           .then((dbThoughtData) => res.json(dbThoughtData))
           .catch((err) => {
               console.log("Error: ", err);
               res.status(500).json(err);
           });
        },
}

  // Get a single thought (by id)

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id found." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    // Create a new thought

    createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => {
            return User.findOneAndUpdate(

              { _id: req.body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            console.log("An error occurred: ", err);
            res.status(500).json(err);
          });
      }

    //   Update thouhgt

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((updatedThought) => {
            if (!updatedThought) {
              return res.status(404).json({ message: "No thought with this id found." });
            } else {
              res.json(updatedThought);
            }
          })
          .catch((err) => res.json(err));
      },
    
    //   Delete a thought

    deleteThought(req, res) {
        Thought.fineOneAndDelete({ _id: req.params.id })
        .then((dbThoughtData) => {
            !dbThoughtData ? res.status(404).json({
                message: "Thought not found." })
            : res.status(200).json({ message: "Tought deleted." });
        });
    },
    .catch((err)  => {
        console.log("Error: ", err);
        res.status(500).json(err);
    });


}

 // Create a reaction

 createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $push: { reactions: body }},
        { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
        !dbThoughtData ? res.status(404).json({ message: "No thought found"})
        : res.json({ message: "Reaction was added", dbThoughtData, });
    })
    .catch((err) => res.json(err));
 },

// Delete a reaction

deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.ractionId}}},
        { runValidators: true, new: true }
    )
    .then((dbThoughtData) => {
        if(!dbThoughtData) {
            return res.status(404).json({ message: "No thought found"});
        }
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

};

module.exports = thoughtController;





