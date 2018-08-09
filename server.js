"use strict"
const http = require('http');
const application = require('./application');
const constantes = require('../library/constantes');
const multicastSender = require('../library/multicastSender');
const multicastRecver = require('../library/multicastRecver');

const port = process.env.PORT || 0;

// Diffuseur de notification multicast
const mcSender = new multicastSender(constantes.MCastAppPort, constantes.MCastAppAddr);
// Créer un serveur HTTP
const server = http.createServer(application);
server.listen(port, function () {
  var host = constantes.getServerIpAddress();
  var port = server.address().port
  mcSender.sendAlways(JSON.stringify({ type: constantes.MSMessageTypeEnum.regAnnonce, host: host, port: port }));
  console.log("AFORegistry listening at http://%s:%s", host, port)
});

// const mcRecver = new multicastRecver(constantes.getServerIpAddress(), constantes.MCastAppPort, constantes.MCastAppAddr, (address, port, message) => {
//   console.log('MCast Msg: From: ' + address + ':' + port + ' - ' + message);
// });

console.log('AFORegistry RESTful API server started on: ' + port);
