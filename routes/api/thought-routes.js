const router = require ("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
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
router.route('/:thoughtId/reactions').post(createReaction);

// Remove reaction API

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
