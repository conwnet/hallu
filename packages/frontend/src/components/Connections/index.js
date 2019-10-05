/**
 * @file 连接列表
 * @author netcon
 */

import React from 'react';
import {get} from 'lodash/fp';
import {useSelector} from 'react-redux';

const Connections = () => {
    const connections = useSelector(get('connections'));

    return (
        <ul>
            {connections.map(conn => <li key={conn}>{conn}</li>)}
        </ul>
    );
};

export default Connections;
