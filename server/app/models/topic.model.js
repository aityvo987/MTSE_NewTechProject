const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
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
    topicPeriod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TopicPeriod',
    },
    score: Number,
});

topicSchema.path('students').validate(function (value) {
    return value.length <= 2;
}, 'Maximum 2 students in a topic');

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
