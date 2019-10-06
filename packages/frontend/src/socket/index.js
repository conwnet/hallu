/**
 * @file socket.io update
 * @author netcon
 */

import EventEmitter from 'events';
import io from 'socket.io-client';
import store from '../store';

class Socket extends EventEmitter {
    init() {
        const socket = io('http://localhost:3001');

        socket.on('NEW_CONNECTION', connection => {
            store.dispatch({type: 'ADD_CONNECTION', payload: {result: connection.url}});
        });
    }
}

export default new Socket();
