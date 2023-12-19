const { authJwt } = require('../middlewares');
const facultyController = require('../controllers/faculty.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/faculties', [authJwt.verifyToken, authJwt.isAdmin],  facultyController.addFaculty);
  app.get('/api/faculties', [authJwt.verifyToken],  facultyController.getAllFaculties)
  app.get('/api/faculties/:facultyId', [authJwt.verifyToken],  facultyController.getFacultyDetail)
  app.put('/api/faculties/:facultyId', [authJwt.verifyToken, authJwt.isAdmin], facultyController.editFaculty);
  app.delete('/api/faculties/:facultyId', [authJwt.verifyToken, authJwt.isAdmin], facultyController.deleteFaculty);
};
