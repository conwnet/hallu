/**
 * @file Http Proxy Server
 */

const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const httpProxy = require('./httpProxy');
const httpsHandler = require('./httpsHandler');

const app = new Koa();

app.use(bodyParser());
app.use(httpProxy());

const server = http.createServer(app.callback());

server.on('connect', httpsHandler);

module.exports = server;

