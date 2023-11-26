const mongoose = require('mongoose');
const Lecture = require('../models/lecture.model');

// Controller to add a new lecture
exports.addLecture = async (req, res) => {
  try {
    const { name, lectureId, email, dateOfBirth, phoneNumber, faculty } = req.body;

    // Validate faculty as a valid ObjectId value
    if (!mongoose.Types.ObjectId.isValid(faculty)) {
      return res.status(400).json({ error: 'Invalid faculty ObjectId' });
    }

    const newLecture = new Lecture({
      name,
      lectureId,
      email,
      dateOfBirth,
      phoneNumber,
      faculty,
    });

    const savedLecture = await newLecture.save();
    res.status(201).json(savedLecture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all lectures
exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('faculty');
    res.status(200).json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};