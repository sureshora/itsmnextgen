const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// Create an Asset
router.post('/', async (req, res) => {
    try {
        const asset = await Asset.create(req.body);
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Assets
router.get('/', async (req, res) => {
    try {
        const assets = await Asset.findAll();
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
