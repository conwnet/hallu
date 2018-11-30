import * as http from 'http';
import * as socketIO from 'socket.io';
import mock from './mock';

const socket: (server: http.Server) => http.Server = server => {
    const io = socketIO(server);

    io.on('connection', mock);

    return server;
};

export default socket;
