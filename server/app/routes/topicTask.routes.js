const { authJwt } = require('../middlewares');
const topicTaskController = require('../controllers/topicTask.controller');
const fileUploadMiddleware = require('../middlewares/fileUpload');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.post('/api/topicTasks', [authJwt.verifyToken, authJwt.isLectureOrFacultyHead], topicTaskController.addTopicTask);
    app.get('/api/topicTasks', [authJwt.verifyToken, authJwt.isStudentOrLectureOrFacultyHead], topicTaskController.getAllTopicTasks);
    app.get('/api/topicTasks/:topicTaskId', [authJwt.verifyToken, authJwt.isStudentOrLectureOrFacultyHead], topicTaskController.getTopicTaskDetail);
    app.put('/api/topicTasks/:topicTaskId', [authJwt.verifyToken, authJwt.isLectureOrFacultyHead], topicTaskController.updateTopicTask);
    app.delete('/api/topicTasks/:topicTaskId', [authJwt.verifyToken, authJwt.isLectureOrFacultyHead], topicTaskController.deleteTopicTask);
    app.patch('/api/topicTasks/:topicTaskId/upload-file', [authJwt.verifyToken, authJwt.isStudent], fileUploadMiddleware, topicTaskController.uploadTaskFile);
    app.patch('/api/topicTasks/:topicTaskId/comment', [authJwt.verifyToken, authJwt.isLectureOrFacultyHead], topicTaskController.commentTopicTask);
    app.get('/api/topicTasks/:topicTaskId/get-files', [authJwt.verifyToken, authJwt.isStudentOrLectureOrFacultyHead], topicTaskController.getAllTopicTaskFile);
    app.get('/api/topicTasks/download-file/:fileId', [authJwt.verifyToken, authJwt.isStudentOrLectureOrFacultyHead], fileUploadMiddleware, topicTaskController.downLoadTopicTaskFile);
    app.delete('/api/topicTasks/:topicTaskId/delete-file/:fileId', [authJwt.verifyToken, authJwt.isStudent], topicTaskController.deleteTopicTaskFile);
};