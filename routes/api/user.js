const router = require("express").Router();
const {
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController");
const {
  addFriend,
  removeFriend,
} = require("../../controllers/friendController");
// /api/User
router.route("/").get(getUsers).post(createUser);

// /api/User/:userId
router.route("/:userId").get(getOneUser).delete(deleteUser).put(updateUser);

// /api/User/:UserId/assignments
//DO I NEED THIS FOR USER'S THOUGHTS??? DO I ALSO NEED LINE 22 FOR DELETING USER THOUGHTS THEN???
// router.route("/:userId/thoughts").post(addThought);

// /api/User/:UserId/assignments/:assignmentId
router.route("/:userId/friends/:friendId").post(addFriend).put(removeFriend);

module.exports = router;
