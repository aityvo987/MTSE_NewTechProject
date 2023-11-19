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
};
