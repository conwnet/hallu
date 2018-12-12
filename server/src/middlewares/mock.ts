/**
 * @file Mock Server Koa Middleware
 * @author netcon <netcon@live.com>
 */

import * as Koa from 'koa';
import {find, get, at, partial, fromPairs} from 'lodash/fp';
import * as requireFromString from 'require-from-string';
import * as p2e from "path-to-regexp";
import {Mock} from '../types';

const matchUrl: (urlObj: Mock.Url, url: string) => boolean = ({type, value}, url) => (
    type === Mock.Url.Type.Path && p2e(value).test(url)
    || type === Mock.Url.Type.Raw && value === url
    || type === Mock.Url.Type.RegExp && (new RegExp(value)).test(url)
);

const match: (request: Koa.Request, mock: Mock) => boolean = (request, mock) => (
    mock.running
    && matchUrl(mock.url, request.path)
    && mock.methods.includes(Mock.Method[request.method.toUpperCase()])
);

const calcHeaders: (headers: Mock.Response.Header[]) => {[key: string]: string} = headers => (
    fromPairs(headers.filter(get('using')).map((<any>at(['key', 'value']))))
);

const execString: (code: string, ...args: any[]) => any = (code, ...args) => {
    try {
        const exp = requireFromString(code);
        return typeof exp === 'function' ? exp(...args) : exp;
    } catch (e) {
        return e.toString();
    }
};

const calcBody: (ctx: Koa.Context, body: Mock.Response.Body) => Promise<string> = async (ctx, body) => (
    body.type === Mock.Response.Body.Type.Script
        ? await execString(body.script, ctx.request, ctx.response)
        : body.raw
);

const resolve: (ctx: Koa.Context, response: Mock.Response) => void = async (ctx, {status, message, headers, body}) => {
    ctx.response.body = await calcBody(ctx, body);
    ctx.response.status = status;
    ctx.response.message = message;
    ctx.response.set(calcHeaders(headers));
};

const createMiddleware: (mocks: () => Mock[]) => Koa.Middleware = getMocks => async (ctx, next) => {
    const mock = find(partial(match, [ctx.request]), getMocks());
    mock && await resolve(ctx, mock.response);
    await next();
};

export default createMiddleware;
