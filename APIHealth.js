"use strict"
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const os = require('os');
const express = require('express');
const router = express.Router();

//------------------------------------------------------------------------------
// http://localhost:3002/health/status
//------------------------------------------------------------------------------
router.get('/status', (req, res) => {
    res.status(200).json({
        isSuccess: true
    });
})

//------------------------------------------------------------------------------
// http://localhost:3002/health/ipstatus
//------------------------------------------------------------------------------
router.get('/ipstatus', (req, res) => {
    res.status(200).json(
        os.networkInterfaces()
    );
})
module.exports = router;