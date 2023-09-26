const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .lean();
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      //NOT SURE IF THIS IS CORRECT
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.status(200).json({ thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      //NOT SURE IF THIS IS CORRECT
      const reaction = await Thought.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $push: { reactions: reaction._id } },
        { new: true }
      );
      res.status(200).json({ reaction, thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      //NOT SURE IF THIS IS CORRECT
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        //we use $set instead of $push because push adds to an array, set is just overwrite
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({ thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //DONT THINK THIS ONE WORKS
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
