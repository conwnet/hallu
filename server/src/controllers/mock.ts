import * as uuid from 'uuid/v1';
import {db} from '../database';
import {Controller} from '../types';

export const mock: Controller = {
    FETCH_MOCKS() {
        return db.mocks.select();
    },
    UPDATE_MOCK(mock) {
        if (mock.id.toUpperCase() === 'NEW') {
            return db.mocks.create({...mock, id: uuid()}).id;
        } else if (db.mocks.update(mock)) {
            return mock.id;
        }
        throw [1000, 'Not Found!'];
    }
};

