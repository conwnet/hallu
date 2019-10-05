/**
 * @file root reducers
 * @author netcon
 */

import {combineReducers} from 'redux';
import entities from './entities';
import connections from './connections';

const rootReducer = combineReducers({
    entities,
    connections,
});

export default rootReducer;
