// const { authJwt } = require('../middlewares');
const majorController = require('../controllers/major.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/majors', majorController.addMajor);
  app.get('/api/majors', majorController.getAllMajors);
};
