const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorDataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('sensor_data', SensorDataSchema);