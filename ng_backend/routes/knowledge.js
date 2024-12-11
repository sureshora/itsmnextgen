const express = require('express');
const router = express.Router();
const Knowledge = require('../models/Knowledge');

// Create a Knowledge Article
router.post('/', async (req, res) => {
    try {
        const article = await Knowledge.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Articles
router.get('/', async (req, res) => {
    try {
        const articles = await Knowledge.findAll();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
