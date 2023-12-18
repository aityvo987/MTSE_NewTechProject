
const sessionController = require('../controllers/session.controller.js');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define major routes
  app.get('/api/session', sessionController.getsession);
};
