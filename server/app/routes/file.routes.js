// const fileController = require('../controllers/file.controller');
// const fileUploadMiddleware = require('../middlewares/fileUpload');

// module.exports = function (app) {
//     // Allow cross-origin requests (CORS)
//     app.use((req, res, next) => {
//       res.header('Access-Control-Allow-Origin', '*');
//       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//       next();
//     });
  
//     app.post('/api/files', fileUploadMiddleware, fileController.addFile);
//     app.get('/api/files/:fileId', (req, res) => {
//       // Set headers for file download
//       res.setHeader('Content-Disposition', 'attachment');
//       fileController.getFile(req, res);
//     });
//     app.delete('/api/files/:fileId', fileController.deleteFile);
//   };
