const Koa = require('koa');
const koaStatic = require('koa-static');

const app = new Koa();

const staticPrefixes = [
    '/asset-manifest.json',
    '/favicon.ico',
    '/index.html',
    '/manifest.json',
    '/precache-manifest',
    '/service-worker.js',
    '/static'
];

const onlyStatic = async (ctx, next) => {
    if (!staticPrefixes.some(prefix => ctx.request.path.startsWith(prefix))) {
        ctx.request.path = '/index.html';
    }
    await next();
};

app.use(onlyStatic);
app.use(koaStatic(__dirname + '/build'));

module.exports = app;
