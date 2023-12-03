//const { authJwt } = require('../middlewares');
const studentController = require('../controllers/student.controller');

module.exports = function (app) {
  // Enable CORS (Cross-Origin Resource Sharing) headers
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define major routes
  app.post('/api/students', studentController.addStudent);
  app.get('/api/students', studentController.getAllStudents);
  app.put('/api/students/:id', studentController.updateStudent);
  app.patch('/api/students/:id/status', studentController.updateStatusStudent);
};
