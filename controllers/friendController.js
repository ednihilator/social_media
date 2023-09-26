const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $push: { friends: req.params.userId } },
        { new: true }
      );
      res.json({ user, friend });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );
      res.json({ user, friend });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
