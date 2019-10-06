/**
 * @file Request
 * @author netcon
 */

class Request {
    constructor(instance) {
        if (!instance) {
            throw new Error('Request must be initialized!');
        }

        if (instance instanceof Request) {
            this.initFromInstance(instance);
        } else {
            this.initFromReq(instance);
        }
    }

    initFromReq(req) {
        this.header = this.req.headers;
    }

    initFromInstance(instance) {

    }

}

export default Request;
