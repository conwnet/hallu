/* eslint-disable import/unambiguous, import/no-commonjs */
const {get, last} = require('lodash/fp');
const {generateScopedStyleName} = require('./utils');

// 给当前规则的 CSS Modules 增加 camelCase: true 配置
const enableCssModulesCamelCase = rule => {
    const config = rule.use.find(config => (config.loader || '').includes('css-loader'));

    if (config) {
        config.options.camelCase = true;
        config.options.getLocalIdent = ({resourcePath}, localIdentName, localName) => {
            return generateScopedStyleName(localName, resourcePath);
        };
    }
};

// 更新 css 配置，默认开启 CSS Modules
// 使用 .global.(css|less|scss|sass) 的不开启 CSS Modules
// 当更新 create-react-app 这里可能要更新（当其中的配置规则变化时）
const adjustCssConfig = lessLoaderOptions => config => {
    const rules = config.module.rules.find(i => i.oneOf).oneOf;
    const [css, modulesCss, sass, modulesSass] = [
        /\.css$/, /\.module\.css$/, /\.(scss|sass)$/, /\.module\.(scss|sass)$/,
    ].map(patten => rules.find(rule => String(rule.test) === String(patten)));
    const lessLoaderConfig = {
        loader: require.resolve('less-loader'),
        options: {
            sourceMap: get('options.sourceMap', last(modulesSass.use)) || false,
            ...lessLoaderOptions,
        },
    };
    const [less, modulesLess] = [
        {...sass, use: sass.use.slice(0, -1).concat(lessLoaderConfig)},
        {...modulesSass, use: modulesSass.use.slice(0, -1).concat(lessLoaderConfig)},
    ];

    css.test = /(node_modules.*|\.global)\.css$/;
    Reflect.deleteProperty(css, 'exclude');
    modulesCss.test = /\.css$/;
    modulesCss.exclude = css.test;
    enableCssModulesCamelCase(modulesCss);

    sass.test = /(node_modules.*|\.global)\.s[ca]ss$/;
    Reflect.deleteProperty(sass, 'exclude');
    modulesSass.test = /\.s[ca]ss$/;
    modulesSass.exclude = sass.test;
    enableCssModulesCamelCase(modulesSass);

    less.test = /(node_modules.*|\.global)\.less$/;
    Reflect.deleteProperty(less, 'exclude');
    modulesLess.test = /\.less$/;
    modulesLess.exclude = less.test;
    enableCssModulesCamelCase(modulesLess);

    // 需要放在配置项的倒数第二个（file-loader 之前）
    rules.splice(rules.length - 1, 0, less, modulesLess);
    return config;
};

module.exports = adjustCssConfig;
