const express = require('express');
const Controller = require('./controller');

const app = express.Router();

app.post('/create', (req, res) => {
    Controller.createTurf(req, res);
});

app.patch('/:id', (req, res) => {
    Controller.editTurf(req, res);
});

app.get('/:id', (req, res) => {
    Controller.turfDetail(req, res);
});

app.get('/', (req, res) => {
    Controller.turfList(req, res);
});

app.patch('/delete/:id', (req, res) => {
    Controller.deleteTurf(req, res);
});

module.exports = app;