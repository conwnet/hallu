import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';

const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(async ctx => {
    ctx.body = 'hello world';
});

app.listen(3001);
