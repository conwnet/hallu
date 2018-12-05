import io from 'socket.io-client';
import {compose, getOr} from 'lodash/fp';

const socket = io('http://localhost:5261');

export const fetchMocks = () => new Promise(resolve => {
    socket.emit('FETCH_MOCKS', compose(resolve, getOr([], 'data')));
});

export const updateMock = mock => new Promise(resolve => {
    socket.emit('UPDATE_MOCK', mock, compose(resolve, getOr(null, 'data')));
});
