const express = require('express');
const UserRouter = require('./user/router');
const TurfAdminRouter = require('./turfAdmin/router');

const app = express.Router();

app.use('/user', UserRouter);
app.use('/turf_admin', TurfAdminRouter);

module.exports = app;