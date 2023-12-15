const notificationController = require('../controllers/notification.controller');
const fileUploadMiddleware = require('../middlewares/fileUpload');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    
    app.post('/api/notifications', notificationController.addNotification);
    app.get('/api/notifications', notificationController.getAllNotifications);
    app.get('/api/notifications/:notificationId', notificationController.getNotification);
    app.put('/api/notifications/:notificationId', notificationController.updateNotification);
    app.delete('/api/notifications/:notificationId', notificationController.deleteNotification);
    app.patch('/api/notifications/:notificationId/upload-file', fileUploadMiddleware, notificationController.uploadNotificationFile);
    app.get('/api/notifications/:notificationId/get-files', notificationController.getAllNotificationFile);
    app.get('/api/notifications/download-file/:fileId', fileUploadMiddleware, notificationController.downLoadNotificationFile);
    app.delete('/api/notifications/:notificationId/delete-file/:fileId', notificationController.deleteNotificaitonFile);
};
