const express = require('express');
const application = express();

const apiRegistryRoutes = require('./registry');
application.use('/registry', apiRegistryRoutes);

module.exports = application;