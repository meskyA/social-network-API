const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/userController");

// User API

router.route('/').get(getUsers).post(createUser);

// Single user API

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Friend API

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
