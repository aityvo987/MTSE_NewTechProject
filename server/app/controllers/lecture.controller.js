const mongoose = require('mongoose');
const Lecture = require('../models/lecture.model');

module.exports = {
  // Controller to add a new lecture
  addLecture: async (req, res) => {
    try {
      const { name, lectureId, email, dateOfBirth, phoneNumber, faculty, isFacultyHead } = req.body;

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
        isFacultyHead,
      });

      const savedLecture = await newLecture.save();
      res.status(201).json(savedLecture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Controller to get all lectures
  getAllLectures: async (req, res) => {
    try {
      const lectures = await Lecture.find().populate('faculty');
      res.status(200).json(lectures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Controller to update all properties except isActive
  updateLecture: async (req, res) => {
    try {
      const { id } = req.params
      const { lectureId, name, email, dateOfBirth, phoneNumber, faculty, isFacultyHead } = req.body;

      // var string = `${id}`
      // return res.status(200).json(string)

      // Validate faculty as a valid ObjectId value
      if (faculty && !mongoose.Types.ObjectId.isValid(faculty)) {
        return res.status(400).json({ error: 'Invalid faculty ObjectId' });
      }

      const updatedLecture = await Lecture.findByIdAndUpdate(
        id,
        {
          name,
          lectureId,
          email,
          dateOfBirth,
          phoneNumber,
          faculty,
          isFacultyHead,
        },
        { new: true }
      );

      if (!updatedLecture) {
        return res.status(404).json({ error: 'Lecture not found' });
      }

      res.json(updatedLecture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Controller to update only the isActive field
  updateStatusLecture: async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body

      // var string = `${isActive}`
      // return res.status(200).json(string)

      const updatedLecture = await Lecture.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      );

      if (!updatedLecture) {
        return res.status(404).json({ error: 'Lecture not found' });
      }

      res.json(updatedLecture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
}

