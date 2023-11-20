const mongoose = require('mongoose');
const Student = require('../models/student.model');

exports.addStudent = async (req, res) => {
  try {
    const { name, studentId, email, dateOfBirth, phoneNumber, faculty, major } = req.body;

    // Validate faculty and major as valid ObjectId values
    if (!mongoose.Types.ObjectId.isValid(faculty)) {
      return res.status(400).json({ error: 'Invalid faculty ObjectId' });
    }

    if (!mongoose.Types.ObjectId.isValid(major)) {
      return res.status(400).json({ error: 'Invalid major ObjectId' });
    }

    const newStudent = new Student({
      name,
      studentId,
      email,
      dateOfBirth,
      phoneNumber,
      faculty,
      major,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('faculty').populate('major');
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
