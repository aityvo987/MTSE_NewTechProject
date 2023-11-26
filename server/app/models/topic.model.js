const mongoose = require('mongoose');

const topictSchema = new mongoose.Schema({
    topicName: String,
    description: String,
    status: Boolean,
    isApproved: Boolean,
    score: Number,
    createAt: Date,
    startAt: Date,
    completeAt: Date,
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
});

const Topic = mongoose.model('Topic', topictSchema);

module.exports = Topic;
