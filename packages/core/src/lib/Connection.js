/**
 * @file Connection
 * @author netcon
 */

const Request = require('../Request');
const Response = require('../Response');

class Connection {
    constructor() {
        this.prevent = false;
        this.request = new Request();
        this.response = new Response();
    }
}

export default Connection;
