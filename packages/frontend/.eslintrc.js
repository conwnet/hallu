const path = require('path');

module.exports = {
    extends: '@ecomfe/eslint-config/strict',
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', path.join(__dirname, 'src')]
                ],
                extensions: ['.ts', '.tsx', '.js', '.jsx']
            }
        },
        react: {
            version: '16.8'
        }
    },
    rules: {
        'no-console': 'warn',
        // TODO: Bug: https://github.com/benmosher/eslint-plugin-import/pull/1375
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'unknown',
                    'parent',
                    'sibling',
                    'index'
                ]
            }
        ],
        // TODO: Bug: https://github.com/babel/eslint-plugin-babel/issues/180
        'react-hooks/exhaustive-deps': 'warn',
        'no-unused-vars': 'warn',
        'no-underscore-dangle':'off'
    }
}
