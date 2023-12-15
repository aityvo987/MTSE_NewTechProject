const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    lastUpdatedAt: {
        type: Date,
        default: new Date(),
    },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
        }
    ],
});

const anotification = mongoose.model('Notification', notificationSchema);

module.exports = anotification;
