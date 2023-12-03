//const { authJwt } = require('../middlewares');
const facultyController = require('../controllers/faculty.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/faculties',  facultyController.addFaculty);
  app.get('/api/faculties',  facultyController.getAllFaculties)
  app.put('/api/faculties/:facultyId', facultyController.editFaculty);
  app.delete('/api/faculties/:facultyId', facultyController.deleteFaculty);
};
