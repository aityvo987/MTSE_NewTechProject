const { authJwt } = require('../middlewares');
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
  app.post('/api/lectures', [authJwt.verifyToken, authJwt.isAdmin], lectureController.addLecture);
  app.get('/api/lectures', lectureController.getAllLectures);
  app.put('/api/lectures/:id', [authJwt.verifyToken, authJwt.isAdmin], lectureController.updateLecture);
  app.patch('/api/lectures/:id/status', [authJwt.verifyToken, authJwt.isAdmin], lectureController.updateStatusLecture);
};
