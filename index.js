const express = require('express');
const bodyParser = require('body-parser')
const setup = require('./setupDB');
const query = require('./queryDB');

// Create a connection with our database
setup.initFirestore();

// Create Express app
const api = express();

// parse application/json
api.use(bodyParser.json())

// Create a Timestamp
function getTimestamp() {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const d = new Date();
    const Timestamp = d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear() + ' - ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return Timestamp.toString();
}

// Set Routes
api.get('/api/data', async (req, res) => {
    try {
        const data = await query.fetchData('data', 'time', 'desc');             // Fetch data
        res.json(data);                                                                                 // Return the data as a JSON response
    } catch (error) {
        console.error(error);                                                                           // Log error if catched
        res.status(500).json({error: 'Failed to get data'});                                 // And return the error through the API
    }
});

api.get('/api/data/:id/:field/:operator?', async (req, res) => {
    try {
        let data;
        if (req.params.operator === undefined) {
            data = await query.fetchDataByParam('data', req.params.id, req.params.field);
        } else {
            data = await query.fetchDataByWhere('data', req.params.id, req.params.operator, req.params.field);
        }
        res.json(data);
    } catch (error) {
        console.error(error);                                                                           // Log error if catched
        res.status(500).json({error: 'Failed to get data'});                                 // And return the error through the API
    }
});

api.post('/api/insert', async (req, res) => {
    try {
        const body = req.body;
        const date = getTimestamp();

        const insert = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            iban: body.iban,
            age: body.age,
            time: date
        }

        const data = await query.insertData('data', body.iban, insert);
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to insert data'});
    }
});

// Start server
const port = process.env.PORT || 3000;
api.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
