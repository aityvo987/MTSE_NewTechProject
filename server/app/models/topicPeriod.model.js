const mongoose = require('mongoose');

const topicPeriodSchema = new mongoose.Schema({
  topicPeriodName: String,
  startDate: Date,
  dueDate: Date,
});

const topicPeriod = mongoose.model('TopicPeriod', topicPeriodSchema);

module.exports = topicPeriod;