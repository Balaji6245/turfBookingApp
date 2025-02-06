const express = require('express');
const UserAuth = require('./user/auth/router');
const TurfAdminRouter = require('./turfAdmin/auth/router');

const app = express.Router();
app.use('/user', UserAuth);
app.use('/turf_admin', TurfAdminRouter);

module.exports = app;