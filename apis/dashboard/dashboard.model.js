const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    lastseen: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date, // Use the Date type for storing dates
        default: Date.now // Set the default value to the current date
    },
    temp: {
        type: Number,
        required: true
    },
    humidity: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Dashboard', Schema);