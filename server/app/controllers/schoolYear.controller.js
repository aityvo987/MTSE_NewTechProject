const SchoolYear = require('../models/schoolYear.model');

module.exports = {
    addSchoolYear: async (req, res) => {
        try {
            const { name, startDate, dueDate } = req.body;

            if (!name || !startDate || !dueDate) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const newSchoolYear = await SchoolYear.create({
                name,
                startDate,
                dueDate,
            });

            res.status(201).json(newSchoolYear);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllSchoolYears: async (req, res) => {
        try {
            const schoolYears = await SchoolYear.find();
            res.json(schoolYears);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getSchoolYearDetail: async (req, res) => {
        try {
            const { schoolYearId } = req.params;

            if (!schoolYearId) {
                return res.status(400).json({ error: 'School Year ID is required' });
            }

            const foundSchoolYear = await SchoolYear.findById(schoolYearId);

            if (!foundSchoolYear) {
                return res.status(404).json({ error: 'School Year not found' });
            }

            res.json(foundSchoolYear);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    editSchoolYear: async (req, res) => {
        try {
            const { schoolYearId } = req.params;
            const { name, startDate, dueDate } = req.body;

            if (!schoolYearId || !name || !startDate || !dueDate) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const updatedSchoolYear = await SchoolYear.findByIdAndUpdate(
                schoolYearId,
                { name, startDate, dueDate },
                { new: true }
            );

            if (!updatedSchoolYear) {
                return res.status(404).json({ error: 'School Year not found' });
            }

            res.status(201).json(updatedSchoolYear);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteSchoolYear: async (req, res) => {
        try {
            const { schoolYearId } = req.params;

            if (!schoolYearId) {
                return res.status(400).json({ error: 'School Year ID is required' });
            }

            const deletedSchoolYear = await SchoolYear.findByIdAndDelete(schoolYearId);

            if (!deletedSchoolYear) {
                return res.status(404).json({ error: 'School Year not found' });
            }

            res.json({ message: 'School Year deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
