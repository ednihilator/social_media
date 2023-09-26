const mongoose = require("mongoose");
const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      //THE ARROW FUNCTION CREATES A NEW OBJECTID FOR EACH REACTION, OTHERWISE ALL REACTIONS MADE
      //WOULD SHARE THE SAME ID
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
  },
  {
    toJSON: { getters: true, virtuals: true },
    //THE REASON WHY WE WANT THESE IDS TO NOT EXIST IS BECAUSE IT CAN CONFUSE US WHEN WE WANT TO USE THE REACTION ID
    id: false,
    _id: false,
  }
);
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  //THIS MEANS IF YOU WANT TO USE A GET OR A VIRTUAL, IT'S ENABLED
  {
    toJSON: { getters: true, virtuals: true },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
