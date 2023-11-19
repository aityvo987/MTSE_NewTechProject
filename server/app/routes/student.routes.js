const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes
router.post('/students', studentController.addStudent);
router.get('/students', studentController.getAllStudents);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
