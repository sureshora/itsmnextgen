const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const chatbotRoute = require('./routes/chatbot');
const Asset = require('./models/Asset');
const Incident = require('./models/Incident');
const Request = require('./models/Request');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chatbot route
app.use('/api/chatbot', chatbotRoute);

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <h1 style="text-align: center; color: blue;">Welcome to Backend</h1>
        <p style="text-align: center;">This is the backend server for ITSM NextGen.</p>
    `);
});

// Create Incident
app.post('/api/incidents', async (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const incident = await Incident.create({
            title,
            description,
            priority,
        });
        res.status(201).json({ message: 'Incident created successfully', incident });
    } catch (error) {
        console.error('Error creating incident:', error);
        res.status(500).json({ error: 'Failed to create incident', details: error.message });
    }
});

// View Incidents
app.get('/api/incidents', async (req, res) => {
    try {
        const incidents = await Incident.findAll();
        res.status(200).json(incidents);
    } catch (error) {
        console.error('Error fetching incidents:', error.message);
        res.status(500).json({ error: 'Failed to fetch incidents', details: error.message });
    }
});

// Create Asset
app.post('/api/assets', async (req, res) => {
    const { name, type, description, ownername, location, created_at } = req.body;

    if (!name || !type || !ownername || !location) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const asset = await Asset.create({
            name,
            type,
            description,
            ownername,
            location,
            created_at: created_at || new Date().toISOString(),
        });
        res.status(201).json({ message: 'Asset created successfully', asset });
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ error: 'Failed to create asset', details: error.message });
    }
});

// View Assets
app.get('/api/assets', async (req, res) => {
    try {
        const assets = await Asset.findAll();
        res.status(200).json(assets);
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ error: 'Failed to fetch assets', details: error.message });
    }
});

// Create Request
app.post('/api/requests', async (req, res) => {
    const {
        title,
        description,
        requested_by,
        requested_date,
        change_type,
        priority,
        impact,
        risk_level,
        planned_start_date,
        planned_end_date,
        implementation_plan,
        backout_plan,
        approvers,
        affected_services,
        change_status,
    } = req.body;

    if (!title || !description || !requested_by || !change_type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const request = await Request.create({
            title,
            description,
            requested_by,
            requested_date: requested_date || new Date().toISOString(),
            change_type,
            priority,
            impact,
            risk_level,
            planned_start_date,
            planned_end_date,
            implementation_plan,
            backout_plan,
            approvers,
            affected_services,
            change_status: change_status || 'New',
        });
        res.status(201).json({ message: 'Request created successfully', request });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ error: 'Failed to create request', details: error.message });
    }
});

// View Requests
app.get('/api/requests', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const requests = await Request.findAndCountAll({
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        });

        res.status(200).json({
            totalItems: requests.count,
            totalPages: Math.ceil(requests.count / limit),
            currentPage: parseInt(page, 10),
            data: requests.rows,
        });
    } catch (error) {
        console.error('Error fetching requests:', error.message);
        res.status(500).json({ error: 'Failed to fetch requests', details: error.message });
    }
});

// Add Incidents to Chatbot
app.post('/', async (req, res) => {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query is required and must be a string' });
    }

    try {
        let response;

        if (query.toLowerCase().includes('assets')) {
            const assets = await Asset.findAll();
            response = { type: 'assets', data: assets };
        } else if (query.toLowerCase().includes('requests')) {
            const requests = await Request.findAll();
            response = { type: 'requests', data: requests };
        } else if (query.toLowerCase().includes('incidents')) {
            const incidents = await Incident.findAll();
            response = { type: 'incidents', data: incidents };
        } else {
            response = { type: 'error', message: 'I can only answer about assets, requests, or incidents.' };
        }

        res.json(response);
    } catch (error) {
        console.error('Error processing chatbot query:', error.message);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

//dashboard results
// Create a route to fetch dashboard statistics
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        const incidentsCount = await Incident.count(); // Count all incidents
        const changeRequestsCount = await Request.count(); // Count all change requests
        const assetsCount = await Asset.count(); // Count all assets

        res.status(200).json({
            incidents: incidentsCount,
            changeRequests: changeRequestsCount,
            assets: assetsCount,
        });
    } catch (error) {
        console.error('Error fetching dashboard statistics:', error.message);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics', details: error.message });
    }
});



// Start the server
const PORT = process.env.PORT || 3074;

db.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error('Database sync error:', error));
