const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Set up Cloudinary configuration (replace with your Cloudinary details)
cloudinary.config({
  cloud_name: 'dwjiirpcy',
  api_key: '956683459234511',
  api_secret: 'IOTe3vQ6nqbCM_UhnvPWolAjgrw',
});

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
