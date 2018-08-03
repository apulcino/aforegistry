//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const fetch = require('node-fetch');

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
class MServiceMgr {
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    constructor() {
        this.idxcheckMService = 0;
        this.items = [];
        this.intervalObj = setInterval(() => {
            if (this.items.length > 0) {
                this.idxcheckMService %= this.items.length;
                let Srv = this.items[this.idxcheckMService];
                let url = Srv.url + '/health/status';
                this.checkMService(url).then(res => {
                    Srv.cptr += 1;
                    Srv.status = (res === true);
                });
                this.idxcheckMService += 1;
            }
        }, 5000);
    }

    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    listAll() {
        return this.items;
    }

    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    declare(protocol, type, host, port, pathname) {
        let ms = {
            type: type,
            url: protocol + '://' + host + ':' + port,
            host: host,
            port: port,
            pathname: pathname,
            status: 0,
            cptr: 0
        }
        let index = this.indexOf(type, ms.url);
        if (-1 === index) {
            this.items.push(ms);
            return ms;
        } else {
            this.items[index].cptr += 1;
            return this.items[index];
        }
    }
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    indexOf(type, url) {
        let idx = -1;
        this.items.forEach((element, index) => {
            if (element.type === type && element.url === url) {
                idx = index;
                return idx;
            }
        });
        return idx;
    }
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    checkMService(urlSrv) {
        return new Promise(function (resolve, reject) {
            fetch(urlSrv, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(response => {
                resolve(true);
            }).catch(err => {
                console.log('checkMService : Error on service : ', urlSrv);
                resolve(false);
            });
        });
    }
}

module.exports = MServiceMgr;