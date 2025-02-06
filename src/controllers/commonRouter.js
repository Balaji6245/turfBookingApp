const express = require('express');
const UserRouter = require('./user/router');

const app = express.Router();

app.use('/user', UserRouter);

module.exports = app;