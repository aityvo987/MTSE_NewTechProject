const topicPeriodController = require('../controllers/topicPeriod.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/topicPeriods', topicPeriodController.addTopicPeriod);
  app.get('/api/topicPeriods', topicPeriodController.getAllTopicPeriods);
  app.put('/api/topicPeriods/:topicPeriodId', topicPeriodController.editTopicPeriod);
  app.delete('/api/topicPeriods/:topicPeriodId', topicPeriodController.deleteTopicPeriod);
};