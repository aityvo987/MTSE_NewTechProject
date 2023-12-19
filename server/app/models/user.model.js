const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    rolename: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture"
      },
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ]
  })
);

module.exports = User;
