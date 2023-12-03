const topicController = require('../controllers/topic.controller');

module.exports = function (app) {
  // Enable CORS (Cross-Origin Resource Sharing) headers
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define topic routes
  app.post('/api/topics', topicController.addTopic);
  app.get('/api/topics', topicController.getAllTopics);
  app.put('/api/topics/:topicId', topicController.updateTopic);
  app.delete('/api/topics/:topicId', topicController.deleteTopic);
};
