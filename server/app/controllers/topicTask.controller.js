const TopicTask = require('../models/topicTask.model');
const fileController = require('../controllers/file.controller');
const mongoose = require('mongoose');

module.exports = {
    addTopicTask: async (req, res) => {
        try {
            const { taskName, description, deadline, topic } = req.body;

            if (topic && !mongoose.Types.ObjectId.isValid(topic)) {
                return res.status(400).json({ error: 'Invalid topic ObjectId' });
            }

            const newTopicTask = await TopicTask.create({
                taskName,
                description,
                deadline,
                topic,
            });

            res.json(newTopicTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllTopicTasks: async (req, res) => {
        try {
            const topicTasks = await TopicTask.find().populate('topic').populate('files');
            res.json(topicTasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getTopicTask: async (req, res) => {
        try {
            const { topicTaskId } = req.params;

            if (!topicTaskId) {
                return res.status(400).json({ error: 'Topic Task ID is required' });
            }

            const topicTask = await TopicTask.findById(topicTaskId).populate('topic').populate('files');

            if (!topicTask) {
                return res.status(404).json({ error: 'Topic Task not found' });
            }

            res.json(topicTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateTopicTask: async (req, res) => {
        try {
            const { topicTaskId } = req.params;
            const { taskName, description, deadline, topic } = req.body;

            if (topic && !mongoose.Types.ObjectId.isValid(topic)) {
                return res.status(400).json({ error: 'Invalid topic ObjectId' });
            }

            if (!topicTaskId) {
                return res.status(400).json({ error: 'Topic Task ID is required' });
            }

            const updatedTopicTask = await TopicTask.findByIdAndUpdate(
                topicTaskId,
                {
                    taskName,
                    description,
                    deadline,
                    topic,
                },
                { new: true }
            );

            if (!updatedTopicTask) {
                return res.status(404).json({ error: 'Topic Task not found' });
            }

            res.json(updatedTopicTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    uploadTaskFile: async (req, res) => {
        try {
            const { topicTaskId } = req.params;
            const { fileName, fileType } = req.body;
            const content = req.file.buffer;


            const newFile = await fileController.addFile(fileName, fileType, content);

            if (!newFile) {
                return res.status(500).json({ error: 'Failed to create a new file' });
            }

            let files = new Array();

            files.push(newFile);

            if (!topicTaskId) {
                return res.status(400).json({ error: 'Topic Task ID is required' });
            }

            const updatedTopicTask = await TopicTask.findByIdAndUpdate(
                topicTaskId,
                {
                    files,
                },
                { new: true }
            );

            if (!updatedTopicTask) {
                return res.status(404).json({ error: 'Topic Task not found' });
            }

            res.json(updatedTopicTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    commentTopicTask: async (req, res) => {
        try {
            const { topicTaskId } = req.params;
            const { comment } = req.body;

            if (!topicTaskId) {
                return res.status(400).json({ error: 'Topic Task ID is required' });
            }

            const updatedTopicTask = await TopicTask.findByIdAndUpdate(
                topicTaskId,
                {
                    comment,
                },
                { new: true }
            );

            if (!updatedTopicTask) {
                return res.status(404).json({ error: 'Topic Task not found' });
            }

            res.json(updatedTopicTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteTopicTask: async (req, res) => {
        try {
            const { topicTaskId } = req.params;

            if (!topicTaskId) {
                return res.status(400).json({ error: 'Topic Task ID is required' });
            }

            const deletedTopicTask = await TopicTask.findByIdAndDelete(topicTaskId);

            if (!deletedTopicTask) {
                return res.status(404).json({ error: 'Topic Task not found' });
            }

            res.json({ message: 'Topic Task deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
