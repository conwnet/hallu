/**
 * @file HTTPS Proxy Hanlder
 * @author netcon
 */

const url = require('url');
const net = require('net');

// alpha version, just pipe two sockets
module.exports = (req, cltSocket, head) => {
    const {hostname, port = 443} = url.parse(`https://${req.url}`);
    const {httpVersion = '1.1'} = req;

    const srvSocket = net.connect(port, hostname, () => {
        cltSocket.write(`HTTP/${httpVersion} 200 Connection established\r\n\r\n`)
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
    });

    cltSocket.on('error', () => srvSocket.end());
    srvSocket.on('error', () => cltSocket.end());
};
