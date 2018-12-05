import * as http from 'http';
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import {createMockMiddleware} from './middlewares';
import control from './controllers';
import {db} from './database';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(createMockMiddleware(db.mocks.select));

export default control(http.createServer(app.callback()));
