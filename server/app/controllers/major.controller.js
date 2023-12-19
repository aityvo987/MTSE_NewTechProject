const Major = require('../models/major.model');

module.exports = {
  addMajor: async (req, res) => {
    try {
      const { majorName } = req.body;

      if (!majorName) {
        return res.status(400).json({ error: 'Major Name is required' });
      }

      const newMajor = await Major.create({
        majorName,
      });

      res.json(newMajor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllMajors: async (req, res) => {
    try {
      const majors = await Major.find();
      res.json(majors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getMajorDetail: async (req, res) => {
    try {
      const { majorId } = req.params;

      if (!majorId) {
        return res.status(400).json({ error: 'Major ID is required' });
      }

      const foundMajor = await Major.findById(majorId);

      if (!foundMajor) {
        return res.status(404).json({ error: 'Major not found' });
      }

      res.json(foundMajor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  editMajor: async (req, res) => {
    try {
      const { majorId } = req.params;
      const { majorName } = req.body;

      if (!majorId || !majorName) {
        return res.status(400).json({ error: 'Major ID and new Major Name are required' });
      }

      const updatedMajor = await Major.findByIdAndUpdate(
        majorId,
        { majorName: majorName },
        { new: true }
      );

      if (!updatedMajor) {
        return res.status(404).json({ error: 'Major not found' });
      }

      res.json(updatedMajor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteMajor: async (req, res) => {
    try {
      const { majorId } = req.params;

      if (!majorId) {
        return res.status(400).json({ error: 'Major ID is required' });
      }

      const deletedMajor = await Major.findByIdAndDelete(majorId);

      if (!deletedMajor) {
        return res.status(404).json({ error: 'Major not found' });
      }

      res.json({ message: 'Major deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  
};
