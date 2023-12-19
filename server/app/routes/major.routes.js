const { authJwt } = require('../middlewares');
const majorController = require('../controllers/major.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/majors', [authJwt.verifyToken, authJwt.isAdmin], majorController.addMajor);
  app.get('/api/majors', [authJwt.verifyToken], majorController.getAllMajors);
  app.get('/api/majors/:majorId', [authJwt.verifyToken], majorController.getMajorDetail);
  app.put('/api/majors/:majorId', [authJwt.verifyToken, authJwt.isAdmin], majorController.editMajor);
  app.delete('/api/majors/:majorId', [authJwt.verifyToken, authJwt.isAdmin], majorController.deleteMajor);
};
