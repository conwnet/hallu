import 'fs';
import * as Koa from 'koa';
import {Mock} from './types';
import * as p2e from 'path-to-regexp';

const mocks: Mock[] = [];

const matchUrl = ({type, value}, url) => (
    type === 'path' && p2e(value).test(url)
    || type === 'raw' && value === url
    || type === 'regexp' && (new RegExp(value)).test(url)
);
const match: (mock: Mock, request: Koa.Request) => boolean = (mock, request) => (
        mock.status
        && matchUrl(mock.url, request.url)
        && mock.methods.includes(request.method.toUpperCase())
);

const middleware: Koa.Middleware = (ctx: Koa.Context, next: Function) => {
    for (let mock of mocks) {
        if (match(mock, ctx.request)) {

        }
    }
    next();
}
