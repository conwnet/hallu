/**
 * @file Koa HTTP Proxy Middleware
 * @author netcon
 */

const axios = require('axios');

const httpProxy = getOptions => async (ctx, next) => {
    const options = getOptions ? getOptions() : {};
    const {request, response} = ctx;

    if (!options.shouldProxy || options.shouldProxy(request, response)) {
        const {url, method, headers, rawBody} = request;

        try {
            const result = await axios.request({
                url, method, headers, data: rawBody
            });
            response.status = result.status;
            response.message = result.statusText;
            response.set(result.headers);
            response.body = result.data;

            if (options.didProxy) options.didProxy(request, response);
        } catch (e) {
            response.status = 500;
            response.body = 'Hallu Proxy Error: ' + e.message;
        }
    }

    await next();
};

module.exports = httpProxy;
