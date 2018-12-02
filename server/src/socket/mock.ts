import * as io from 'socket.io';
import * as uuid from 'uuid/v1';
import {Mock} from "../types";
import {mocks} from '../data';

const mock: (client: io.Socket) => void = socket => {
    socket.on('FETCH_MOCKS', callback => callback({status: 0, message: 'OK', data: mocks}));

    socket.on('UPDATE_MOCK', (mock: Mock, callback) => {
        if (mock.id.toUpperCase() === 'NEW') {
            mocks.create({...mock, id: uuid()});
            callback({status: 0, message: 'OK', data: mock.id});
        } else {
            mocks.update(mock)
                ? callback({status: 0, message: 'OK', data: mock.id})
                : callback({status: 1000, message: 'Not Found!'});
        }
    });
};

export default mock;