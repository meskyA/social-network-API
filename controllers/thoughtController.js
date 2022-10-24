const { thought, user } = require("../models");

// Get all thoughts
const thoughtController = {
    getThoughts(req, res) {
        thought.find({})
           .then((dbThoughtData) => res.json(dbThoughtData))
           .catch((err) => {
               console.log("Error: ", err);
               res.status(500).json(err);
           });
        },

  // Get a single thought (by id)

  getSingleThought(req, res) {
    thought.findOne({ _id: req.params.thoughtId })
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
        thought.create(req.body)
          .then((dbThoughtData) => {
            return user.findOneAndUpdate(
              
              { _id: req.body.userId },
              { $push: { thought: dbThoughtData._id } },
              { new: true }
              );
            })
            
          .then((dbUserData) => {
            console.log(dbUserData)
            res.json(dbUserData)
          })
          .catch((err) => {
            console.log("An error occurred: ", err);
            res.status(500).json(err);
          });
      },

    //   Update thouhgt

    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.id }, body, {
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
        thought.fineOneAndDelete({ _id: req.params._id })
        .then((dbThoughtData) => {
            !dbThoughtData ? res.status(404).json({
                message: "Thought not found." , })
            : res.status(200).json({ message: "Thought deleted.", });
        })

    .catch((err)  => {
        console.log("Error: ", err);
        res.status(500).json(err);
    });
},

 // Create a reaction

 createReaction({ params, body }, res) {
    thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $push: { reactions: body } },
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
    thought.findOneAndUpdate(
        {_id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId}}},
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





