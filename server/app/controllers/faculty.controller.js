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
};
