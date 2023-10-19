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