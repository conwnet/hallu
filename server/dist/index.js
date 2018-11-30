"use strict";
exports.__esModule = true;
var http = require("http");
var Koa = require("koa");
var cors = require("@koa/cors");
var bodyParser = require("koa-bodyparser");
var mock_1 = require("./mock");
var socket_1 = require("./socket");
var data_1 = require("./data");
var app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(mock_1["default"](data_1.mocks));
socket_1["default"](http.createServer(app.callback())).listen(3001);
//# sourceMappingURL=index.js.map