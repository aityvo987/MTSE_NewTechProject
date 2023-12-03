const mongoose = require('mongoose');
const Topic = require('../models/topic.model');

module.exports = {
    // Controller to add a new topic
    addTopic: async (req, res) => {
        try {
            const {
                topicName,
                description,
                students,
                faculty,
                major,
            } = req.body;

            if (students != null) {
                const areStudentsValid = students.every(studentId => mongoose.Types.ObjectId.isValid(studentId));

                if (!areStudentsValid) {
                    return res.status(400).json({ error: 'Invalid studentId in the students array' });
                }
            }

            if (!mongoose.Types.ObjectId.isValid(faculty)) {
                return res.status(400).json({ error: `Invalid facultyId ${faculty}` });
            }

            if (!mongoose.Types.ObjectId.isValid(major)) {
                return res.status(400).json({ error: `Invalid majorId ${major}` });
            }

            const newTopic = new Topic({
                topicName,
                description,
                students,
                faculty,
                major,
                createAt: new Date(),
            });

            const savedTopic = await newTopic.save();
            res.status(201).json(savedTopic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Controller to get all topics
    getAllTopics: async (req, res) => {
        try {
            const topics = await Topic.find()
                .populate('lecture')
                .populate('students')
                .populate('faculty')
                .populate('major');
            res.status(200).json(topics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Controller to update a topic
    updateTopic: async (req, res) => {
        try {
            const { topicId } = req.params;
            const {
                topicName,
                description,
                students,
                faculty,
                major,
            } = req.body;

            if (students != null) {
                const areStudentsValid = students.every(studentId => mongoose.Types.ObjectId.isValid(studentId));

                if (!areStudentsValid) {
                    return res.status(400).json({ error: 'Invalid studentId in the students array' });
                }
            }

            if (!mongoose.Types.ObjectId.isValid(faculty)) {
                return res.status(400).json({ error: `Invalid facultyId ${faculty}` });
            }

            if (!mongoose.Types.ObjectId.isValid(major)) {
                return res.status(400).json({ error: `Invalid majorId ${major}` });
            }

            const updatedTopic = await Topic.findByIdAndUpdate(
                topicId,
                {
                    topicName,
                    description,
                    students,
                    faculty,
                    major,
                },
                { new: true }
            ).populate('students').populate('faculty').populate('major');

            if (!updatedTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            res.json(updatedTopic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Controller to delete a topic
    deleteTopic: async (req, res) => {
        try {
            const { topicId } = req.params;

            const deletedTopic = await Topic.findByIdAndDelete(topicId);

            if (!deletedTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            res.json({ message: 'Topic deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}

