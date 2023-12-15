const topicTaskController = require('../controllers/topicTask.controller');
const fileUploadMiddleware = require('../middlewares/fileUpload');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.post('/api/topicTasks', topicTaskController.addTopicTask);
    app.get('/api/topicTasks', topicTaskController.getAllTopicTasks);
    app.get('/api/topicTasks/:topicTaskId', topicTaskController.getTopicTask);
    app.put('/api/topicTasks/:topicTaskId', topicTaskController.updateTopicTask);
    app.delete('/api/topicTasks/:topicTaskId', topicTaskController.deleteTopicTask);
    app.patch('/api/topicTasks/:topicTaskId/upload-file', fileUploadMiddleware, topicTaskController.uploadTaskFile);
    app.patch('/api/topicTasks/:topicTaskId/comment', topicTaskController.commentTopicTask);
    app.get('/api/topicTasks/:topicTaskId/get-files', topicTaskController.getAllTopicTaskFile);
    app.get('/api/topicTasks/download-file/:fileId', fileUploadMiddleware, topicTaskController.downLoadTopicTaskFile);
    app.delete('/api/topicTasks/:topicTaskId/delete-file/:fileId', topicTaskController.deleteTopicTaskFile);
};