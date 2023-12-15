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
db.topicPeriod = require("./topicPeriod.model")
db.topicTask = require("./topicTask.model")
db.file = require("./file.model")
db.notification = require("./notification.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;