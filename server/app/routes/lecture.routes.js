const lectureController = require('../controllers/lecture.controller');

module.exports = function (app) {
  // Enable CORS (Cross-Origin Resource Sharing) headers
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define lecture routes
  app.post('/api/lectures', lectureController.addLecture);
  app.get('/api/lectures', lectureController.getAllLectures);
};
