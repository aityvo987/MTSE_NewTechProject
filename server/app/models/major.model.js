const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  majorName: String,
});

const major = mongoose.model('Major', majorSchema);

module.exports = major;