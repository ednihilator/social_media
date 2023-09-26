const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all students
  async getUsers(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("friends")
        .select("-__v")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No course with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      //THIS MAY NOT BE DONE/WORK
      const thoughts = await Thought.deleteMany(
        { username: user.username },
        { new: true }
      );

      if (!thoughts) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User and thoughts successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
