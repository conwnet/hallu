/* eslint-disable import/unambiguous, import/no-commonjs */
const path = require('path');
const hasha = require('hasha');
const paramCase = require('param-case');

const generateScopedStyleName = (name, filename) => {
    const hash = hasha(filename + name, {algorithm: 'md5'});
    const basename = path.basename(filename, path.extname(filename));
    const componentName = basename === 'index' ? path.basename(path.dirname(filename)) : basename;

    return `${paramCase(componentName)}-${name}-${hash.slice(0, 5)}`;
};

module.exports = {
    generateScopedStyleName,
};
