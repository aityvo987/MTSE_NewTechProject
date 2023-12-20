const { authJwt } = require('../middlewares');
const schoolYearController = require('../controllers/schoolYear.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/schoolYears', [authJwt.verifyToken, authJwt.isAdmin], schoolYearController.addSchoolYear);
  app.get('/api/schoolYears', [authJwt.verifyToken], schoolYearController.getAllSchoolYears);
  app.get('/api/schoolYears/:schoolYearId', schoolYearController.getSchoolYearDetail);
  app.put('/api/schoolYears/:schoolYearId', [authJwt.verifyToken, authJwt.isAdmin], schoolYearController.editSchoolYear);
  app.delete('/api/schoolYears/:schoolYearId', [authJwt.verifyToken, authJwt.isAdmin], schoolYearController.deleteSchoolYear);
};
