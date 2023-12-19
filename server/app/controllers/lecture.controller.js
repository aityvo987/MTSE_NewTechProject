const mongoose = require('mongoose');
const Lecture = require('../models/lecture.model');
const User = require('../models/user.model');

module.exports = {
  // Controller to add a new lecture
  addLecture: async (req, res) => {
    try {
      const { name, lectureId, email, dateOfBirth, phoneNumber, faculty, isFacultyHead } = req.body;

      // Validate faculty as a valid ObjectId value
      

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

  getLectureDetail: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid lecture ObjectId' });
      }

      const foundLecture = await Lecture.findById(id);

      if (!foundLecture) {
        return res.status(404).json({ error: 'Lecture not found' });
      }

      res.json(foundLecture);
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

      res.status(201).json(updatedLecture);
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

  deleteLecturer: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("dleting",id);
      if (!id) {
        return res.status(400).json({ error: 'Lecturer ID is required' });
      }

      const deletedLecturer = await Lecture.findById(id);
      const account = await User.findOne({email:deletedLecturer.email});
      console.log(deletedLecturer);
      console.log(account);
      if (!deletedLecturer ||!account) {
        return res.status(404).json({ error: 'Lecturer not found' });
      }

      deletedLecturer.deleteOne();
      account.deleteOne();

      res.status(201).json({ message: 'Lecturer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
}

