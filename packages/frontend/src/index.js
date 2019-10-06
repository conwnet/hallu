/**
 * @file entry
 * @author netcon
 */

import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './pages/App';
import store from './store';
import socket from './socket';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

socket.init();
