const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: {
    type: String,
    unique: true,
  },
  avatar: String,
  email: String,
  dateOfBirth: Date,
  phoneNumber: String,
  address: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  major: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Major',
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
