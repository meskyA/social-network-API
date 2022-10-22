const router = require ("express").Router();
const {
    getThoughts,
    getSingleThoughts,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

// Thoughts API

router.route('/').get(getThoughts).post(createThought);

// Single thought API

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// Reactions API
router.route('/:thoughtId/reactions').post(addReaction);

// Remove reaction API

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
