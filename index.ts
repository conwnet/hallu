#!/usr/bin/env node

import * as program from 'commander';
import * as Koa from 'koa';
import * as koaStatic from 'koa-static';
import server from './server';

program
    .version('0.0.1', '-v, --version')
    .option('-p, --ports <ports>', 'control,mock,proxy', '5260,5261,5262')
    .parse(process.argv);

const parsePorts = (ports: string): number[] => {
    const [cp, mp, pp] = ports.split(',').map(i => +i);
    return [cp || 5260, mp || 5261, pp || 5262];
};

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

const main = ([cp, mp, pp]: number[]): void => {
    (new Koa()).use(onlyStatic).use(koaStatic(__dirname + '/static')).listen(cp);
    server.listen(mp);
};

main(parsePorts(program.ports));
