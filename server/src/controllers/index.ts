import * as http from 'http';
import * as socketIO from 'socket.io';
import {mock} from './mock';
import {Controller} from '../types';

const consume = (con: Controller) => (socket: socketIO.Socket) => {
    Object.entries(con).filter(([event]) => event.toUpperCase() === event).forEach(([event, handler]) => {
        socket.on(event, (...params) => {
            const callback = params.pop();

            try {
                callback({status: 0, message: 'OK', data: handler(...params)});
            } catch ([status, message]) {
                callback({status, message});
            }
        });
    });
};

const control: (server: http.Server) => http.Server = server => {
    const io = socketIO(server);

    io.on('connection', consume(mock));

    return server;
};

export default control;
