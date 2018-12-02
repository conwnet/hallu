import {findIndex, first} from 'lodash/fp';
import {Mock, Record, Table} from './types'

const isEqualRecord = record => ({id}) => id === record.id;
const createTable: <T extends Record>(table: T[]) => Table<T> = table => ({
    select() {
        return table;
    },
    create(record) {
        return table.push(record);
    },
    update(record) {
        const index = findIndex(isEqualRecord(record), table);

        return index < 0 ? null : first(table.splice(index, 1, record));
    },
    delete(record) {
        const index = findIndex(isEqualRecord(record), table);

        return index < 0 ? null : first(table.splice(index, 1));
    }
});

export const mocks = createTable<Mock>([]);
