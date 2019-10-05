/**
 * @file Koa HTTP Proxy Middleware
 * @author netcon
 */

const axios = require('axios');

const httpProxy = getOptions => async (ctx, next) => {
    const options = getOptions ? getOptions() : {};
    const {request, response} = ctx;

    if (!options.beforeProxy || async options.beforeProxy(request, response)) {
        const {url, method, headers, rawBody} = request;

        try {
            const result = await axios.request({
                url, method, headers, data: rawBody
            });
            response.status = result.status;
            response.message = result.statusText;
            response.set(result.headers);
            response.body = result.data;

            if (options.afterProxy) await options.afterProxy(request, response);
        } catch (e) {
            response.status = 500;
            response.body = 'Hallu Proxy Error: ' + e.message;
        }
    }

    await next();
};

httpProxy.default = httpProxy;
module.exports = httpProxy;
