const express = require('express');
const UserAuth = require('./user/auth/router');

const app = express.Router();
app.use('/user', UserAuth);

module.exports = app;