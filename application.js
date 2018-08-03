const constantes = require('../library/constantes');
const express = require('express');
const application = express();

const apiRegistryRoutes = require('./registry');
application.use('/registry', apiRegistryRoutes);

const apiHealthRoutes = require('./APIHealth');
application.use(constantes.MSPathnameEnum.afoHealth, apiHealthRoutes);

module.exports = application;