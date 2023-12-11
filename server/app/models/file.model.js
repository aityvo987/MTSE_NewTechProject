const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  content: Buffer,
});

const file = mongoose.model('File', fileSchema);

module.exports = file;