const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  name: String,
  lectureId: String,
  email: String,
  dateOfBirth: Date,
  phoneNumber: String,
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  }
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
