/* eslint-disable import/unambiguous, import/no-commonjs */
const path = require('path');
const {get} = require('lodash/fp');
const EstPlugin = require('less-plugin-est');
const {override, useEslintRc, addBabelPlugins, addWebpackAlias} = require('customize-cra');

const adjustCssConfig = require('./adjust-css-config');
const lessVariables = require('./less-variables');

// 输出当前配置，调试使用
// eslint-disable-next-line no-unused-vars
const print = (path = '') => config => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(get(path, config), (k, v) => {
        if (typeof v === 'function') {
            return v.toString || '<function>';
        }
        return Object.prototype.toString.apply(v) === '[object RegExp]' ? v.toString() : v;
    }, 2));
    return null;
};

module.exports = override(
    useEslintRc('.eslintrc.js'),
    addWebpackAlias({'@': path.resolve(__dirname, '../src')}),
    adjustCssConfig({
        javascriptEnabled: true,
        plugins: [new EstPlugin({advanced: true})],
        modifyVars: lessVariables,
    }),
    addBabelPlugins(
        'react-require', // jsx 文件自动 import React
        'lodash', // lodash 按需加载
        ['import', {libraryName: 'antd', style: true}], // antd 按需加载
        /* Experimental Plugins */
        '@babel/plugin-proposal-class-properties', // class Anonymous { name = 'unknow' }
        ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: true}], // @debounce()
        '@babel/plugin-proposal-do-expressions', // do {}
        '@babel/plugin-proposal-export-default-from', // export v from 'mod';
        '@babel/plugin-proposal-export-namespace-from', // export * as ns from 'mod';
        '@babel/plugin-proposal-function-bind', // obj::func
        '@babel/plugin-proposal-function-sent', // function.sent
        '@babel/plugin-proposal-logical-assignment-operators', // a ||= b;
        '@babel/plugin-proposal-nullish-coalescing-operator', // const foo = object.foo ?? "default";
        '@babel/plugin-proposal-numeric-separator', // const budget = 1_000_000_000_000;
        '@babel/plugin-proposal-optional-chaining', // const baz = obj?.foo?.bar?.baz;
        // buggy '@babel/plugin-proposal-partial-application', // const addOne = addTwo(1, ?);
        ['@babel/plugin-proposal-pipeline-operator', {'proposal': 'minimal'}], // value |> func | console.log
        '@babel/plugin-proposal-private-methods', // class Anonymous { #age = 18 }
        '@babel/plugin-proposal-throw-expressions' // param === true || throw new Error('Falsey!');
    )
    // print('module.rules')
);
