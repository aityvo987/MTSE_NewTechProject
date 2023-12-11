const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  name: String,
  lectureId: {
    type: String,
    unique: true,
  },
  email: String,
  dateOfBirth: Date,
  phoneNumber: String,
  isFacultyChair: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
