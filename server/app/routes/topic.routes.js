const { authJwt } = require('../middlewares');
const topicController = require('../controllers/topic.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define topic routes
  app.post('/api/topics', [authJwt.verifyToken, authJwt.isLectureOrFacultyHead], topicController.addTopic);
  app.get('/api/topics', topicController.getAllTopics);
  app.get('/api/topics/:topicId', topicController.getTopicDetail);
  app.put('/api/topics/:topicId', [authJwt.verifyToken, authJwt.isLectureOrFacultyHead], topicController.updateTopic);
  app.delete('/api/topics/:topicId', [authJwt.verifyToken, authJwt.isLectureOrFacultyHead], topicController.deleteTopic);
  app.patch('/api/topics/:topicId/approve', [authJwt.verifyToken, authJwt.isFacultyHead], topicController.approvalTopic);
  app.patch('/api/topics/:topicId/assign', [authJwt.verifyToken, authJwt.isFacultyHead], topicController.assignInstructor);
  app.patch('/api/topics/:topicId/register', [authJwt.verifyToken], topicController.registerTopic);
};
