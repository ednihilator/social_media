const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (val) {
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          return emailRegex.test(val);
        },
        message: "Invalid email address",
      },
    },
    thoughts: [
      {
        //is line 20 right??
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        //with parenthesis or no after ObjectId???
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { getters: true, virtuals: true },
  }
);

//BECAUSE THIS IS HERE, I DON'T NEED IT IN /MODELS/USER.JS
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//USERS OR USER????????????????????
const User = mongoose.model("User", userSchema);

module.exports = User;
