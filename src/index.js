require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const SensorData = require('./model');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_HOST).then(() => {
    console.log('[SENSORS-LOGGER-API]: Connected to MongoDB');
}).catch((error) => {
    console.error('[SENSORS-LOGGER-API]: Error connecting to MongoDB:', error);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SENSORS-LOGGER-API]: Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Sensors Logger API');
});

app.post('/log', (req, res) => {
    const sensorData = req.body;
    // console.log('[SENSORS-LOGGER-API]: Received sensor data:', sensorData);

    const newSensorData = new SensorData(sensorData);
    newSensorData.save()
        .then(() => {
            console.log('[SENSORS-LOGGER-API]: Sensor data saved to MongoDB');
            res.status(200).send('Data logged successfully');
        })
        .catch((error) => {
            console.error('[SENSORS-LOGGER-API]: Error saving sensor data to MongoDB:', error);
            res.status(500).send('Error saving data');
        });
});

app.get('/logs', (req, res) => {
    const limit = 10;
    const sort = { timestamp: -1 };

    SensorData.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.error('[SENSORS-LOGGER-API]: Error retrieving sensor data from MongoDB:', error);
            res.status(500).send('Error retrieving data');
        }).sort(sort).limit(limit)
});