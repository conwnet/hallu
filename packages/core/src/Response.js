/**
 * @file Response
 * @author netcon
 */

const http = require('http');
const statuses = require('statuses');
const typeis = require('type-is').is;
const isJSON = require('koa-is-json');

class Response {
    constructor(instance) {
        if (instance instanceof http.ServerResponse) {
            this.initFromRes(instance);
        } else {
            this._status = instance._status;
            this._message = instance._message;
            this._headers = instance._headers;
            this._body = instance._body;
        }
    }

    initFromRes(res) {
        this._status = res.statusCode;
        this._message = res.statusMessage;
        this._headers = typeof res.getHeaders === 'function'
            ? res.getHeaders()
            : res._headers || {}; // Node < 7.7
        this._body = null;
    }

    /* status & message */
    get status() {
        return this._status;
    }

    set status(val) {
        assert(Number.isInteger(val), 'status code must be a number');
        assert(val >= 100 && val <= 999, `invalid status code: ${val}`);
        this._status = val;
        this._message = statuses[val];

        if (this.body && statuses.empty[code]) {
            this.body = null;
        }
    }

    get message() {
        return this._message || statuses[this.status];
    }

    set message(val) {
        this._message = val;
    }

    /* headers */
    get headers() {
        return this._headers;
    };

    set headers(val) {
        this._headers = val;
    }

    get header() {
        // alias to headers
        return this.headers;
    }

    set header(val) {
        // alias to headers
        this.headers = val;
    }

    get(field) {
        return this.headers[field.toLowerCase()];
    }

    set(filed, val) {
        if (2 == arguments.length) {
            if (Array.isArray(val)) val = val.map(v => typeof v === 'string' ? v : String(v));
            else if (typeof val !== 'string') val = String(val);
            this.headers[field.toLowerCase()] = val;
        } else {
            for (const key in field) {
                this.set(key, field[key]);
            }
        }
    }

    append(field, val) {
        const prev = this.get(field);

        if (prev) {
            val = Array.isArray(prev)
                ? prev.concat(val)
                : [prev].concat(val);
        }

        return this.set(field, val);
    }

    remove(field) {
        Reflect.deleteProperty(this.headers, field.toLowerCase());
    }

    get type() {
        const type = this.get('Content-Type');
        if (!type) return '';
        return type.split(';', 1)[0];
    }

    is(types) {
        const type = this.type;
        if (!types) return type || false;
        if (!Array.isArray(types)) types = [].slice.call(arguments);
        return typeis(type, types);
    }

    set type(type) {
        type = getType(type);

        if (type) {
            this.set('Content-Type', type);
        } else {
            this.remove('Content-Type');
        }
    }

    get length() {
        const len = this.get('Content-Length');
        const body = this.body;

        if (len === null || len === undefined) {
            if (!body) return;
            if ('string' == typeof body) return Buffer.byteLength(body);
            if (Buffer.isBuffer(body)) return body.length;
            if (isJSON(body)) return Buffer.byteLength(JSON.stringify(body));
            return;
        }

        return Math.trunc(len) || 0;
    }

    set length(n) {
        this.set('Content-Length', n);
    }

    /* body */
    get body() {
        return this._body;
    }

    set body(val) {
        const original = this.body;
        this._body = val;

        // no content
        if (null == val) {
            if (!statuses.empty[this.status]) this.status = 204;
            this.remove('Content-Type');
            this.remove('Content-Length');
            this.remove('Transfer-Encoding');
            return;
        }

        const setType = !this.get('Content-Type');
        // string
        if ('string' == typeof val) {
            if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
            this.length = Buffer.byteLength(val);
            return;
        }

        // buffer
        if (Buffer.isBuffer(val)) {
            if (setType) this.type = 'bin';
            this.length = val.length;
            return;
        }

        // stream
        if ('function' == typeof val.pipe) {
            // overwriting
            if (null !== original && original !== val) {
                this.remove('Content-Length');
            }

            if (setType) this.type = 'bin';
            return;
        }

        // json
        this.remove('Content-Length');
        this.type = 'json';
    }
}

export default Response;
