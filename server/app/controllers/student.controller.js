const mongoose = require('mongoose');
const Student = require('../models/student.model');
const User = require('../models/user.model');

module.exports = {
  addStudent: async (req, res) => {
    try {
      const { name, studentId, email, dateOfBirth, phoneNumber, faculty, major } = req.body;

      // Validate faculty and major as valid ObjectId values
      // if (!mongoose.Types.ObjectId.isValid(faculty)) {
      //   return res.status(400).json({ error: 'Invalid faculty ObjectId' });
      // }

      // if (!mongoose.Types.ObjectId.isValid(major)) {
      //   return res.status(400).json({ error: 'Invalid major ObjectId' });
      // }

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
  },

  // Controller to get all students
  getAllStudents: async (req, res) => {
    
    try {
      const students = await Student.find().populate('faculty').populate('major');
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getStudentDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const foundStudent = await Student.findById(id).populate('faculty').populate('major');

      if (!foundStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.json(foundStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Controller to update student (excluding isActive)
  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, studentId, email, dateOfBirth, phoneNumber, faculty, major } = req.body;

      // Validate faculty and major as valid ObjectId values
      // if (faculty && !mongoose.Types.ObjectId.isValid(faculty)) {
      //   return res.status(400).json({ error: 'Invalid faculty ObjectId' });
      // }

      // if (major && !mongoose.Types.ObjectId.isValid(major)) {
      //   return res.status(400).json({ error: 'Invalid major ObjectId' });
      // }

      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
          name,
          studentId,
          email,
          dateOfBirth,
          phoneNumber,
          faculty,
          major,
        },
        { new: true }
      ).populate('faculty').populate('major');

      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.status(201).json(updatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateProfileStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { phoneNumber, addresss } = req.body;
      console.log("Updateprofile",id);
      console.log("Updateprofile",phoneNumber);
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
          phoneNumber,
          addresss
        },
        { new: true }
      ).populate('faculty').populate('major');

      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.status(201).json(updatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Controller to deactivate student
  updateStatusStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body

      const deactivatedStudent = await Student.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      );

      if (!deactivatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.json(deactivatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("dleting",id);
      if (!id) {
        return res.status(400).json({ error: 'Student ID is required' });
      }

      const deletedStudent = await Student.findById(id);
      const account = await User.findOne({email:deletedStudent.email});
      console.log(deletedStudent);
      console.log(account);
      if (!deletedStudent ||!account) {
        return res.status(404).json({ error: 'Student not found' });
      }

      deletedStudent.deleteOne();
      account.deleteOne();

      res.status(201).json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
}


