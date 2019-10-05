/**
 * @file connection ids reducer
 * @author netcon
 */

const connections = (state = [], action) => {
    if (action.type === 'UPDATE_CONNECTIONS') {
        return [...action.payload];
    }

    if (action.type === 'ADD_CONNECTION') {
        return [...state, action.payload.result];
    }

    return state;
};

export default connections;
