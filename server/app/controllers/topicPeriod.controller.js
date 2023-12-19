const TopicPeriod = require('../models/topicPeriod.model');

module.exports = {
    addTopicPeriod: async (req, res) => {
        try {
            const { topicPeriodName, startDate, dueDate } = req.body;

            if (!topicPeriodName || !startDate || !dueDate) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const newTopicPeriod = await TopicPeriod.create({
                topicPeriodName,
                startDate,
                dueDate,
            });

            res.status(201).json(newTopicPeriod);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllTopicPeriods: async (req, res) => {
        try {
            const topicPeriods = await TopicPeriod.find();
            res.json(topicPeriods);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getTopicPeriodDetail: async (req, res) => {
        try {
          const { topicPeriodId } = req.params;
    
          if (!topicPeriodId) {
            return res.status(400).json({ error: 'Topic Period ID is required' });
          }
    
          const foundTopicPeriod = await TopicPeriod.findById(topicPeriodId);
    
          if (!foundTopicPeriod) {
            return res.status(404).json({ error: 'Topic Period not found' });
          }
    
          res.json(foundTopicPeriod);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

    editTopicPeriod: async (req, res) => {
        try {
            const { topicPeriodId } = req.params;
            const { topicPeriodName, startDate, dueDate } = req.body;

            if (!topicPeriodId || !topicPeriodName || !startDate || !dueDate) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const updatedTopicPeriod = await TopicPeriod.findByIdAndUpdate(
                topicPeriodId,
                { topicPeriodName, startDate, dueDate },
                { new: true }
            );

            if (!updatedTopicPeriod) {
                return res.status(404).json({ error: 'Topic Period not found' });
            }

            res.status(201).json(updatedTopicPeriod);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteTopicPeriod: async (req, res) => {
        try {
            const { topicPeriodId } = req.params;

            if (!topicPeriodId) {
                return res.status(400).json({ error: 'Topic Period ID is required' });
            }

            const deletedTopicPeriod = await TopicPeriod.findByIdAndDelete(topicPeriodId);

            if (!deletedTopicPeriod) {
                return res.status(404).json({ error: 'Topic Period not found' });
            }

            res.json({ message: 'Topic Period deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
