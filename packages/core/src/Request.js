/**
 * @file Request
 * @author netcon
 */

const http = require('http');
const URL = require('url').URL;

const protocol = req => (
    req.socket.encrypted ? 'https' : 'http'
);

const host = req => {
    let host = req.headers['host'];
    if (req.httpVersionMajor >= 2) {
        host = req.headers['::authority']
    }
    return host.split(/\s*,\s*/, 1)[0];
};

const getHrefFromReq = req => (
    /^https?:\/\//i.test(req.url)
        ? req.url
        : `${protocol(req)}://${host(req)}${req.url}`;
);

const defaultPort = protocol => {
    switch (protocol) {
        case 'http':
        case 'ws':
        return 80;

        case 'https':
        case 'wss':
        return 443;

        case 'ftp':
        return 21;

        case 'gopher':
        return 70;
    }
    return 0;
};

class Request {
    constructor(instance) {
        this._method = instance.method;
        this._href = instance instanceof http.IncomingMessage
            : getHrefFromReq(instance)
            : instance.href;
        this._headers = instance.headers;
        this._body = instance.body;
    }

    /* method */
    get method() {
        this._method;
    }

    set method(val) {
        this._method = val.toUpperCase();
    }

    /* url */
    get URL() {
        if (!this.memoizedURL || this.memoizedURL.href !== this._href) {
            try {
                return this.memoizedURL = new URL(this._href);
            } catch (err) {
                return this.memoizedURL = Object.create(null);
            }
        }

        return this.memoizedURL;
    }

    get href() {
        return this.URL.href || '';
    }

    set href(val) {
        this._href = val;
    }

    get url() {
        // url is alias to href
        return this.href;
    }

    set url(val) [
        this.href = val;
    ]

    get origin() {
        return `${this.protocol}://${this.host}`;
    }

    set origin(val) {
        this.href = `${val}${this.path}${this.hash}`;
    }

    get protocol() {
        return (this.URL.protocol || '').replace(/:$/, '');
    }

    set protocol(val) {
        this.href = `${val}://${this.host}${this.path}${this.hash}`;
    }

    get host() {
        return this.URL.host || '';
    }

    set host(val) {
        this.href = `${this.protocol}://${val}${this.path}${this.hash}`;
    }

    get hostname() {
        return this.URL.hostname || '';
    }

    set hostname(val) {
        this.href = `${this.protocol}://${val}:${this.port}${this.path}${this.hash}`;
    }

    get port() {
        return this.URL.port || defaultPort(this.protocol);
    }

    set port(val) {
        this.href = `${this.protocol}://${this.hostname}:${val}${this.path}${this.hash}`;
    }

    get path() {
        return this.URL.path || '';
    }

    set path(val) {
        this.href = `${this.origin}${val}${this.hash}`;
    }

    get pathname() {
        return this.URL.pathname || '';
    }

    set pathname(val) {
        this.href = `${this.origin}${val}${this.search}${this.hash}`;
    }

    get search() {
        return this.URL.search || '';
    }

    set search(val) {
        this.href = `${this.origin}${this.pathname}${val}${this.hash}`;
    }

    set query() {
        return this.URL.query || '';
    }

    set query(val) {
        this.href = `${this.origin}${this.pathname}?${val}${this.hash}`;
    }

    get hash() {
        return this.URL.hash || '';
    }

    set hash(val) {
        this.href = `${this.origin}${this.path}${val}`;
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
        switch (field = field.toLowerCase()) {
        case 'referer':
        case 'referrer':
            return this.headers.referrer || this.headers.referer;
        default:
            return this.headers[field];
        }
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
        Reflect.deleteProperty(this.headers, field);
    }

    /* body */
    get body() {
        return this._body;
    }

    set body(val) {
        this._body = val;
    }
}

export default Request;
