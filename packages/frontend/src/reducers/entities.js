/**
 * @file store entities for normalizr
 * @author netcon
 */

import {merge} from 'lodash/fp';

const entities = (state = {}, action) => {
    if (action.entities) {
        return merge(state, action.entities);
    }

    return state;
};

export default entities;
