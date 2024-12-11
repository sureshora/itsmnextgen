const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Incident = require('../models/Incident');

// Create an Incident
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('priority')
            .isIn(['Low', 'Medium', 'High'])
            .withMessage('Priority must be one of Low, Medium, or High'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const incident = await Incident.create(req.body);
            res.status(201).json(incident);
        } catch (error) {
            console.error('Error Creating Incident:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
);


// Get Incident by ID
router.get('/:id', async (req, res) => {
    try {
        const incident = await Incident.findByPk(req.params.id);
        if (incident) {
            res.json(incident);
        } else {
            res.status(404).json({ error: 'Incident not found' });
        }
    } catch (error) {
        console.error('Error Fetching Incident:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Update an Incident by ID
router.put(
    '/:id',
    [
        body('title').optional().notEmpty().withMessage('Title must not be empty'),
        body('description')
            .optional()
            .notEmpty()
            .withMessage('Description must not be empty'),
        body('priority')
            .optional()
            .isIn(['Low', 'Medium', 'High'])
            .withMessage('Priority must be one of Low, Medium, or High'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const incident = await Incident.findByPk(req.params.id);
            if (incident) {
                await incident.update(req.body);
                res.json(incident);
            } else {
                res.status(404).json({ error: 'Incident not found' });
            }
        } catch (error) {
            console.error('Error Updating Incident:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
);

// Delete an Incident by ID
router.delete('/:id', async (req, res) => {
    try {
        const incident = await Incident.findByPk(req.params.id);
        if (incident) {
            await incident.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Incident not found' });
        }
    } catch (error) {
        console.error('Error Deleting Incident:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
