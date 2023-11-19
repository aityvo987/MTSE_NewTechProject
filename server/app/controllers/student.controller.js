const Student = require('../models/studentModel');

// Controller methods for handling CRUD operations
module.exports = {
    addStudent: async (req, res) => {
        try {
            // Assuming you have a facultyId in the request body
            const facultyId = req.body.facultyId;
            // Validate facultyId
            if (!facultyId) {
                return res.status(400).json({ error: 'Faculty ID is required' });
            }

            const faculty = await Faculty.findById(facultyId);

            if (!faculty) {
                return res.status(404).json({ error: 'Faculty not found' });
            }

            const majorId = req.body.majorId;
            if (!majorId) {
                return res.status(400).json({ error: 'Major ID is required' });
            }

            const major = await Major.findById(majorId);

            if (!major) {
                return res.status(404).json({ error: 'Major not found' });
            }

            const newStudent = await Student.create({
                ...req.body,
                faculty: faculty._id,
            });

            res.json(newStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateStudent: async (req, res) => {
        try {
            const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteStudent: async (req, res) => {
        try {
            await Student.findByIdAndDelete(req.params.id);
            res.json({ message: 'Student deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
