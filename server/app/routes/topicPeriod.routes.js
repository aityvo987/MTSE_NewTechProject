const { authJwt } = require('../middlewares');
const topicPeriodController = require('../controllers/topicPeriod.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/topicPeriods', [authJwt.verifyToken, authJwt.isAdmin], topicPeriodController.addTopicPeriod);
  app.get('/api/topicPeriods', [authJwt.verifyToken], topicPeriodController.getAllTopicPeriods);
  app.put('/api/topicPeriods/:topicPeriodId', [authJwt.verifyToken, authJwt.isAdmin], topicPeriodController.editTopicPeriod);
  app.delete('/api/topicPeriods/:topicPeriodId', [authJwt.verifyToken, authJwt.isAdmin], topicPeriodController.deleteTopicPeriod);
};
