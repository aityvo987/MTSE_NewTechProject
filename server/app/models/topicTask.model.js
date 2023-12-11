const mongoose = require('mongoose');

const topicTaskSchema = new mongoose.Schema({
    taskName: String,
    description: String,
    deadline: Date,
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
    },
    comment: String,
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
        }
    ],
});

const topicTask = mongoose.model('TopicTask', topicTaskSchema);

module.exports = topicTask;
