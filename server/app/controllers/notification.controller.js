const Notification = require('../models/notification.model');
const fileController = require('../controllers/file.controller');

module.exports = {
    addNotification: async (req, res) => {
        try {
            const { title, content } = req.body;

            const newNotification = await Notification.create({
                title,
                content,
            });

            res.json(newNotification);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllNotifications: async (req, res) => {
        try {
            const notifications = await Notification.find();
            res.json(notifications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getNotification: async (req, res) => {
        try {
            const { notificationId } = req.params;

            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }

            const notification = await Notification.findById(notificationId).populate('files');

            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            res.json(notification);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateNotification: async (req, res) => {
        try {
            const { notificationId } = req.params;
            const { title, content } = req.body;

            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }

            const updatedNotification = await Notification.findByIdAndUpdate(
                notificationId,
                {
                    title,
                    content,
                    lastUpdatedAt: new Date(),
                },
                { new: true }
            );

            if (!updatedNotification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            res.json(updatedNotification);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteNotification: async (req, res) => {
        try {
            const { notificationId } = req.params;

            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }

            const deletedNotification = await Notification.findByIdAndDelete(notificationId);

            if (!deletedNotification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            res.json({ message: 'Notification deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    uploadNotificationFile: async (req, res) => {
        try {
            const { notificationId } = req.params;

            const newFile = await fileController.addFile(req.file.originalname, req.file.mimetype, req.file.buffer);

            if (!newFile) {
                return res.status(500).json({ error: 'Failed to create a new file' });
            }

            let files = new Array();

            files.push(newFile);

            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }

            // Update the notification by pushing the new file to the existing files array
            const updatedNotification = await Notification.findByIdAndUpdate(
                notificationId,
                { $push: { files: newFile._id } },
                { new: true }
            );

            if (!updatedNotification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            res.json(updatedNotification);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllNotificationFile: async (req, res) => {
        try {
            const { notificationId } = req.params;

            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }

            const notification = await Notification.findById(notificationId).populate({
                path: 'files',
                select: 'fileName fileType',
            });

            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            const files = notification.files || [];

            res.json(files);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    downLoadNotificationFile: async (req, res) => {
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

    deleteNotificaitonFile: async (req, res) => {
        try {
            const { notificationId, fileId } = req.params;

            const updatedNotification = await Notification.findByIdAndUpdate(
                notificationId,
                {
                    $pull: { files: fileId },
                },
                { new: true }
            );

            if (!updatedNotification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            return await fileController.deleteFile(fileId, res);
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).json({ error: 'Error deleting file' });
        }
    }

};
