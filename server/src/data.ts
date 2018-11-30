import {Mock} from "./mock/types";

export const mocks: Mock[] = [{
    id: '1',
    name: 'mock-1',
    status: Mock.Status.Running,
    url: {type: Mock.Url.Type.Path, value: '/home'},
    methods: [Mock.Method.GET, Mock.Method.POST],
    response: {
        status: 200,
        message: 'OK',
        headers: [{used: true, key: 'Content-Type', value: 'text/plain'}],
        body: {type: Mock.Response.Body.Type.Script, value: 'module.exports = async i => Promise.resolve(i)'}
    }
}];
