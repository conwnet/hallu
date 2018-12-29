/**
 * @file Proxy Server Util Methods
 * @author netcon
 */

const {pick} = require('lodash/fp');
const url = require('url');

const IncomingMessageToRequestOptions = request => {
    const urlOptions = pick(
        ['protocol', 'hostname', 'port', 'method', 'path'],
        url.parse(request.url)
    );

    return {
        ...urlOptions,
        headers: request.headers
    };
};

module.exports = {
    IncomingMessageToRequestOptions
};
