const express = require('express');
const Controller = require('./controller');

const app = express.Router();

app.get('/', (req, res) => {
    Controller.detail(req, res);
});

app.patch('/', (req, res) => {
    Controller.updateProfile(req, res);
});

app.patch('/deactivate', (req, res) => {
    Controller.deactivate(req, res);
});

module.exports = app;