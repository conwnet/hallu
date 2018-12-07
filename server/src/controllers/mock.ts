import {db} from '../database';
import {Controller} from '../types';

export const mock: Controller = {
    FETCH_MOCKS() {
        return db.mocks.select();
    },
    UPDATE_MOCK(mock) {
        if (mock.id === 'new') {
            return db.mocks.create(mock);
        }
        return db.mocks.update(mock);
    },
    DELETE_MOCK(mock) {
        return db.mocks.delete(mock);
    }
};

