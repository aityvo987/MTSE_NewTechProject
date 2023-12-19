const User = require('../models/user.model');

const mongoose = require('mongoose');

module.exports = {
    getAllAccounts: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
