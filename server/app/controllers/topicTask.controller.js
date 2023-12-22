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

            res.status(201).json(newTopicTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllTopicTasks: async (req, res) => {
        try {
            const topicTasks = await TopicTask.find();
            res.json(topicTasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAllTopicTasksTopic: async (req, res) => {
        try {
            
            const { topicId } = req.params;
            const topicTasks = await TopicTask.find({topic:topicId});
            res.json(topicTasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getTopicTaskDetail: async (req, res) => {
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


            const newFile = await fileController.addFile(req.file.originalname, req.file.mimetype, req.file.buffer);

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
                { $push: { files: newFile._id } },
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
            console.log("Topic TaskID:",topicTaskId)

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

            res.status(201).json(updatedTopicTask);
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

    getAllTopicTaskFile: async (req, res) => {
        try {
            const { topicTaskId } = req.params;

            if (!topicTaskId) {
                return res.status(400).json({ error: 'Topic Task ID is required' });
            }

            const topicTask = await TopicTask.findById(topicTaskId).populate({
                path: 'files',
                select: 'fileName fileType',
            });

            if (!topicTask) {
                return res.status(404).json({ error: 'Topic task not found' });
            }

            const files = topicTask.files || [];

            res.json(files);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    downLoadTopicTaskFile: async (req, res) => {
        try {
            // Extract the fileId from the request parameters
            const { fileId } = req.params;

            // Return the result of downloadFile
            return await fileController.downloadFile(fileId, res);

        } catch (error) {
            console.error('Error downloading file:', error);
            res.status(500).json({ error: 'Error downloading file' });
        }
    },

    deleteTopicTaskFile: async (req, res) => {
        try {
            const { topicTaskId, fileId } = req.params;

            const updatedTopicTask = await TopicTask.findByIdAndUpdate(
                topicTaskId,
                {
                    $pull: { files: fileId },
                },
                { new: true }
            );

            if (!updatedTopicTask) {
                return res.status(404).json({ error: 'Topic task not found' });
            }

            return await fileController.deleteFile(fileId, res);
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).json({ error: 'Error deleting file' });
        }
    }
};
