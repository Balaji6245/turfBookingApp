const express = require('express');
const UserRouter = require('./user/router');
const TurfAdminRouter = require('./turfAdmin/router');
const TurfRouter = require('./turf/router');

const app = express.Router();

app.use('/user', UserRouter);
app.use('/turf_admin', TurfAdminRouter);
app.use('/turf', TurfRouter);

module.exports = app;