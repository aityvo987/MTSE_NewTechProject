const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    facultyName: String,
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;