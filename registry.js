"use strict"
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const MServiceMgr = require('./MServiceMgr');


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const MServices = new MServiceMgr();

//------------------------------------------------------------------------------
// http://localhost:5555/registry/list
//------------------------------------------------------------------------------
router.get('/list', (req, res) => {
    res.status(200).json(MServices.listAll());
})
//------------------------------------------------------------------------------
// http://localhost:5555/registry/declare/MSType?host=...&port=...&pathname=....
//------------------------------------------------------------------------------
router.get('/declare/:MSType', (req, res) => {
    let ret = MServices.declare(req.protocol, req.params.MSType, req.query.host, req.query.port, req.query.pathname);
    if (ret) {
        res.status(200).json({
            isSuccess: true,
            item: ret
        });
    } else {
        res.status(500).json({
            isSuccess: false,
            item: null
        });
    }
})

module.exports = router;