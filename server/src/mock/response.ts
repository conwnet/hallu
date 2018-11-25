import * as Koa from 'koa';
import * as requireFromString from 'require-from-string';
import {Mock} from './types';

const resolve_headers: (headers: {key: string, value: string, status: boolean}[]) => {[key: string]: string} = (
    headers => headers.reduce((prev, {key, value, status}) => {
        if (status) {
            prev[key] = value;
        }

        return prev;
    }, {})
);

const resolve: (mock: Mock, ctx: Koa.Context) => void = async (mock, ctx) => {
    const {type, value} = mock.body;

    ctx.response.set(resolve_headers(mock.headers));
    ctx.response.body = type === 'script'
        ? await (requireFromString(value)(ctx))
        : value;
}

export default resolve;

