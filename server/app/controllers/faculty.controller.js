const Faculty = require('../models/faculty.model');

module.exports = {
  addFaculty: async (req, res) => {
    try {
      const { facultyName } = req.body;

      if (!facultyName) {
        return res.status(400).json({ error: 'Faculty Name is required' });
      }

      const newFaculty = await Faculty.create({
        facultyName,
      });

      res.json(newFaculty);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllFaculties: async (req, res) => {
    try {
      const faculties = await Faculty.find();
      res.json(faculties);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  editFaculty: async (req, res) => {
    try {
      const { facultyId } = req.params
      const { newFacultyName } = req.body;

      if (!facultyId || !newFacultyName) {
        return res.status(400).json({ error: 'Faculty ID and new Faculty Name are required' });
      }

      const updatedFaculty = await Faculty.findByIdAndUpdate(
        facultyId,
        { facultyName: newFacultyName },
        { new: true }
      );

      if (!updatedFaculty) {
        return res.status(404).json({ error: 'Faculty not found' });
      }

      res.json(updatedFaculty);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteFaculty: async (req, res) => {
    try {
      const { facultyId } = req.params;

      if (!facultyId) {
        return res.status(400).json({ error: 'Faculty ID is required' });
      }

      const deletedFaculty = await Faculty.findByIdAndDelete(facultyId);

      if (!deletedFaculty) {
        return res.status(404).json({ error: 'Faculty not found' });
      }

      res.json({ message: 'Faculty deleted successfully' });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
