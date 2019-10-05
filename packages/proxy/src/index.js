/**
 * @file Http Proxy Server
 */

const url = require('url');
const net = require('net');
const http = require('http');
const {noop} = require('lodash/fp');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxy();

const server = http.createServer((req, res) => {
    const srvUrl = url.parse(req.url);
    const target = `${srvUrl.protocol || 'http:'}//${srvUrl.hostname}:${srvUrl.port || 80}`;
    proxy.web(req, res, {target});
});

server.on('connect', (req, cltSocket, head) => {
    const srvUrl = url.parse(`http://${req.url}`);
    const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
        cltSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
    });
    cltSocket.on('error', () => cltSocket.end());
    srvSocket.on('error', () => srvSocket.end());
});

proxy.on('error', noop);
server.on('error', noop);
proxy.on('proxyReq', (...args) => server.emit('proxyReq', ...args));
proxy.on('proxyRes', (...args) => server.emit('proxyRes', ...args));

module.exports = server;
module.exports.default = server;
