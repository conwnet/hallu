export const createDefaultMock = () => ({
    id: 'new',
    name: '',
    running: false,
    url: {type: 'path', value: ''},
    methods: ['GET', 'POST'],
    response: {
        status: 200,
        message: 'OK',
        headers: [{key: 'Content-Type', value: 'application/json', using: true}],
        body: {type: 'raw', raw: '{}', script: 'module.exports = async request => ({\n    path: request.path\n});'}
    }
});
