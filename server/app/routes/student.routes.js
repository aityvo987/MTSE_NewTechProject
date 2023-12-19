const { authJwt } = require('../middlewares');
const studentController = require('../controllers/student.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define major routes
  app.post('/api/students', [authJwt.verifyToken, authJwt.isAdmin], studentController.addStudent);
  app.get('/api/students',  studentController.getAllStudents);
  app.put('/api/students/:id', [authJwt.verifyToken, authJwt.isAdmin], studentController.updateStudent);
  app.patch('/api/students/:id/status', [authJwt.verifyToken, authJwt.isAdmin], studentController.updateStatusStudent);
  app.delete('/api/students/:id', [authJwt.verifyToken, authJwt.isAdmin], studentController.deleteStudent);
};
