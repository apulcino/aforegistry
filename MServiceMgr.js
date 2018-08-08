//------------------------------------------------------------------------------
// Gestion des composants
//------------------------------------------------------------------------------
"use strict"
const fetch = require('node-fetch');

//------------------------------------------------------------------------------
// Gestionnaire des composants
//------------------------------------------------------------------------------
class MServiceMgr {
    //------------------------------------------------------------------------------
    // Utilisation d'un timer pour vérifier l'état des composants
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
                    if (Srv.status === false) {
                        let arr = this.items.splice(this.idxcheckMService, 1);
                        console.log('AFORegistry : remove component ref : ', arr[0]);
                    } else {
                        this.idxcheckMService += 1;
                    }
                });
            }
        }, 5000);
    }

    //------------------------------------------------------------------------------
    // Retourner la liste des composants actifs
    //------------------------------------------------------------------------------
    listAll() {
        let activeCompos = this.items.filter((Srv) => {
            return (Srv.status === true);
        });
        return activeCompos;
    }

    //------------------------------------------------------------------------------
    // Ajoute un nouveau composant à la liste
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
            console.log('AFORegistry : declare component : ', ms);
            this.items.push(ms);
            return ms;
        } else {
            this.items[index].cptr += 1;
            return this.items[index];
        }
    }
    //------------------------------------------------------------------------------
    // Rechercher un composant à partir de son type et de son Url
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
    // Appeler le composant pour connaitre son état
    //------------------------------------------------------------------------------
    checkMService(urlSrv) {
        return new Promise(function (resolve, reject) {
            fetch(urlSrv, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(response => {
                resolve(true);
            }).catch(err => {
                resolve(false);
            });
        });
    }
}

module.exports = MServiceMgr;