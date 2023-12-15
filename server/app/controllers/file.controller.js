const File = require('../models/file.model');

module.exports = {
  addFile: async (fileName, fileType, content) => {
    try {
      const newFile = await File.create({
        fileName,
        fileType,
        content,
      });

      return newFile;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  downloadFile: async (fileId, res) => {
    try {
      if (!fileId) {
        return res.status(400).json({ error: 'File ID is required' });
      }

      const file = await File.findById(fileId);

      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      res.setHeader('Content-Type', file.fileType);
      res.setHeader('Content-Disposition', `inline; filename="${file.fileName}"`);
      res.send(file.content);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteFile: async (fileId, res) => {
    try {
      if (!fileId) {
        return res.status(400).json({ error: 'File ID is required' });
      }

      const file = await File.findByIdAndDelete(fileId);

      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};