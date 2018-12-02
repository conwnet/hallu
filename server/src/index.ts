import * as http from 'http';
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import mock from './mock';
import socket from './socket';
import {mocks} from './data';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(mock(mocks.select()));

socket(http.createServer(app.callback())).listen(3001);
