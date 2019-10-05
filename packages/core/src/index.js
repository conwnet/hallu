/**
 * @file core
 * @author netcon
 */

const http = require('http');
const Koa = require('koa');
const socketIO = require('socket.io');
const proxy = require('@hallu/proxy');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketIO(server);

io.on('connection', socket => {
    console.log('a client has connected');

    proxy.on('proxyReq', (proxyReq, req) => {
        socket.emit('NEW_CONNECTION', {url: req.url});
    });

    socket.on('disconnect', socket => {
        console.log('client disconnected');
    });
});

io.listen(3001);
proxy.listen(8000);
