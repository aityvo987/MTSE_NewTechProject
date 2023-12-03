const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  name: String,
  lectureId: String,
  email: String,
  dateOfBirth: Date,
  phoneNumber: String,
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
