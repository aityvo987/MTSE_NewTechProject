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
                topicPeriod,
            } = req.body;
            let instructor = null;
            let thesisLecture = null;
            // if (students != null) {
            //     const areStudentsValid = students.every(studentId => mongoose.Types.ObjectId.isValid(studentId));

            //     if (!areStudentsValid) {
            //         return res.status(400).json({ error: 'Invalid studentId in the students array' });
            //     }
            // }

            // if (!mongoose.Types.ObjectId.isValid(faculty)) {
            //     return res.status(400).json({ error: `Invalid facultyId ${faculty}` });
            // }

            // if (!mongoose.Types.ObjectId.isValid(major)) {
            //     return res.status(400).json({ error: `Invalid majorId ${major}` });
            // }

            // if (!mongoose.Types.ObjectId.isValid(topicPeriod)) {
            //     return res.status(400).json({ error: `Invalid Topic Period ${topicPeriod}` });
            // }

            const newTopic = new Topic({
                topicName,
                description,
                students,
                faculty,
                major,
                topicPeriod,
                instructor,
                thesisLecture,
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
                .populate('instructor')
                .populate('thesisLecture')
                .populate('students')
                .populate('faculty')
                .populate('major')
                .populate('topicPeriod');
            res.status(200).json(topics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getTopicsNotApproved: async (req, res) => {
        try {
            const notApprovedTopics = await Topic.find({ isApproved: false })
                .populate('instructor')
                .populate('thesisLecture')
                .populate('students')
                .populate('faculty')
                .populate('major')
                .populate('topicPeriod');
            
            res.status(200).json(notApprovedTopics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    // Controller to get topics that are approved
    getTopicsApproved: async (req, res) => {
        try {
            const approvedTopics = await Topic.find({ isApproved: true })
                .populate('instructor')
                .populate('thesisLecture')
                .populate('students')
                .populate('faculty')
                .populate('major')
                .populate('topicPeriod');
            
            res.status(200).json(approvedTopics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getTopicDetail: async (req, res) => {
        try {
            const { topicId } = req.params;

            // Validate the topicId
            if (!mongoose.Types.ObjectId.isValid(topicId)) {
                return res.status(400).json({ error: `Invalid topicId: ${topicId}` });
            }

            // Find the topic by ID and populate the related fields
            const topic = await Topic.findById(topicId)
                .populate('instructor')
                .populate('students')
                .populate('faculty')
                .populate('major')
                .populate('topicPeriod');

            // Check if the topic exists
            if (!topic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            res.status(200).json(topic);
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
                topicPeriod,
            } = req.body;

            // if (students != null) {
            //     const areStudentsValid = students.every(studentId => mongoose.Types.ObjectId.isValid(studentId));

            //     if (!areStudentsValid) {
            //         return res.status(400).json({ error: 'Invalid studentId in the students array' });
            //     }
            // }

            // if (!mongoose.Types.ObjectId.isValid(faculty)) {
            //     return res.status(400).json({ error: `Invalid facultyId ${faculty}` });
            // }

            // if (!mongoose.Types.ObjectId.isValid(major)) {
            //     return res.status(400).json({ error: `Invalid majorId ${major}` });
            // }

            // if (!mongoose.Types.ObjectId.isValid(topicPeriod)) {
            //     return res.status(400).json({ error: `Invalid Topic Period ${topicPeriod}` });
            // }

            const updatedTopic = await Topic.findByIdAndUpdate(
                topicId,
                {
                    topicName,
                    description,
                    students,
                    faculty,
                    major,
                    topicPeriod,
                },
                { new: true }
            );

            if (!updatedTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            res.status(201).json(updatedTopic);
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

            res.status(201).json({ message: 'Topic deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    approvalTopic: async (req, res) => {
        try {
            const { topicId } = req.params;
            const {
            } = req.body;

            const updatedTopic = await Topic.findByIdAndUpdate(
                topicId,
                {
                    isApproved: true,
                },
                { new: true }
            );

            if (!updatedTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            res.status(201).json(updatedTopic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    assignInstructor: async (req, res) => {
        try {
            const { topicId } = req.params;
            const { instructor } = req.body;

            // if (!mongoose.Types.ObjectId.isValid(instructor)) {
            //     return res.status(400).json({ error: `Invalid lecture have id: ${instructor}` });
            // }

            const updatedTopic = await Topic.findByIdAndUpdate(
                topicId,
                {
                    instructor
                },
                { new: true }
            ).populate('instructor');

            if (!updatedTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            res.status(201).json(updatedTopic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    assignThesisLecture: async (req, res) => {
        try {
            const { topicId } = req.params;
            const { thesisLecture } = req.body;

            // if (!mongoose.Types.ObjectId.isValid(instructor)) {
            //     return res.status(400).json({ error: `Invalid lecture have id: ${instructor}` });
            // }

            const updatedTopic = await Topic.findByIdAndUpdate(
                topicId,
                {
                    thesisLecture
                },
                { new: true }
            ).populate('thesisLecture');

            if (!updatedTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            res.status(201).json(updatedTopic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    registerTopic: async (req, res) => {
        try {
            const { topicId } = req.params;
            const { student } = req.body;

            // if (!mongoose.Types.ObjectId.isValid(student)) {
            //     return res.status(400).json({ error: `Invalid student id: ${student}` });
            // }

            const topic = await Topic.findById(topicId);

            if (!topic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            // Check if adding the student would exceed the limit
            if (topic.students.length === 2) {
                return res.status(400).json({ error: 'Maximum 2 students in a topic' });
            }

            // Add the student to the students array
            topic.students.push(student);

            // Save the updated topic
            const updatedTopic = await topic.save();

            res.status(201).json({ message: 'Register successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

