const multer = require('multer');
const path = require('path');

// Set up the storage engine
const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
const upload = multer({ storage });

// Middleware to handle file upload
const fileUploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload failed', details: err.message });
    }
    next();
  });
};

module.exports = fileUploadMiddleware;
