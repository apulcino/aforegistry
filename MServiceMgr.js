class MServiceMgr {
    constructor() {
        this.items = [];
    }

    listAll() {
        return this.items;
    }

    declare(type, url) {
        let ms = {
            type: type,
            url: url,
            status: 1,
            cptr: 0
        }
        let index = this.indexOf(type, url);
        if (-1 === index) {
            this.items.push(ms);
            return ms;
        } else {
            this.items[index].cptr += 1;
            return this.items[index];
        }
    }
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
}

module.exports = MServiceMgr;