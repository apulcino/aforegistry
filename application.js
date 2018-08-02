const express = require('express');
const application = express();

const apiRegistryRoutes = require('./registry');
application.use('/registry', apiRegistryRoutes);

const apiHealthRoutes = require('./APIHealth');
application.use('/health', apiHealthRoutes);

module.exports = application;