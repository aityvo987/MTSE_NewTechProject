const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.falcuty = require("./faculty.model")
db.student = require("./student.model")
db.major = require("./major.model")
db.lecture = require("./lecture.model")
db.topic = require("./topic.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;