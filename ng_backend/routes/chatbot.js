const express = require('express');
const router = express.Router();
const db = require('../utils/db'); // Adjust this path if necessary
const Asset = require('../models/Asset'); // Adjust the path if necessary
const Request = require('../models/Request'); // Import Request model as well
const Incident = require('../models/Incident'); //import Incident model as well
router.post('/', async (req, res) => {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query is required and must be a string' });
    }

    try {
        let response;

        if (query.toLowerCase().includes('assets')) {
            const assets = await Asset.findAll(); // Use Sequelize's findAll
            response = {
                type: 'assets',
                data: assets,
            };
        } else if (query.toLowerCase().includes('requests')) {
            const requests = await Request.findAll(); // Use Sequelize's findAll
            response = {
                type: 'requests',
                data: requests,
            };
        } else if (query.toLowerCase().includes('incidents')) {
            const requests = await Request.findAll(); // Use Sequelize's findAll
            response = {
                type: 'incidents',
                data: requests,
            };
        } else {
            response = { type: 'error', message: 'I can only answer about assets or requests or incidents.' };
        }

        res.json(response);
    } catch (error) {
        console.error('Error processing chatbot query:', error.message);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
