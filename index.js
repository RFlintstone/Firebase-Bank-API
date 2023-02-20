const express = require('express');
const setup = require('./setupDB');
const query = require('./queryDB');

// Create a connection with our database
setup.initFirestore();

// Create Express app
const api = express();

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

api.get('/insert', async (req, res) => {
    try {
        // Get a reference to the Firestore database
        const db = admin.firestore();

        // Create a new document with a generated ID
        const newDocRef = db.collection('data').doc();

        // Set the data for the new document
        const data = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            age: 30,
            time: Date.now()
        };

        newDocRef.set(data)
            .then(() => {
                res.json({status: 'Document successfully written'});
            })
            .catch((error) => {
                res.json({status: 'Error writing document: ', error});
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to get data'});
    }
});

// Start server
const port = process.env.PORT || 3000;
api.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
