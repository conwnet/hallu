import * as io from 'socket.io';
import {findIndex} from 'lodash/fp';
import * as uuid from 'uuid/v1';
import {Mock} from "../mock/types";
import {mocks} from '../data';

const mock: (client: io.Socket) => void = socket => {
    socket.on('FETCH_MOCKS', callback => callback({status: 0, message: 'OK', data: mocks}));

    socket.on('UPDATE_MOCK', (mock: Mock, callback) => {
        if (mock.id.toUpperCase() === 'NEW') {
            mock.id = uuid();
            mocks.push(mock);
        } else {
            const index = findIndex((item: Mock) => item.id === mock.id, mocks);

            if (index < 0) {
                callback({status: 1000, message: 'Not Found!'});
            } else {
                mocks.splice(index, 1, mock);
            }
        }
        callback({status: 0, message: 'OK', data: mock});
    });
};

export default mock;