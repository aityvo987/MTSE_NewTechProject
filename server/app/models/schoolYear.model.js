const mongoose = require('mongoose');

const schoolYearSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  dueDate: Date,
});

const SchoolYear = mongoose.model('SchoolYear', schoolYearSchema);

module.exports = SchoolYear;