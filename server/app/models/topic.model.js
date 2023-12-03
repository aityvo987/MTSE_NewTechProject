const mongoose = require('mongoose');

const topictSchema = new mongoose.Schema({
    topicName: String,
    description: String,
    status: Boolean,
    isApproved: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        }
    ],
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
    },
    major: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Major',
    },
    startAt: Date,
    score: Number,
    completeAt: Date,
});

const Topic = mongoose.model('Topic', topictSchema);

module.exports = Topic;
