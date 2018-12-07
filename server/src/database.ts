import * as uuid from 'uuid/v1';
import {first, merge, isEqual} from 'lodash/fp';
import {Mock, Record, Table} from './types'

const isEqualRecord = record => ({id}) => id === record.id;
const createTable: <T extends Record>(table: T[]) => Table<T> = table => ({
    find(id) {
        return id ? table.find(record => record.id === id) : first(table);
    },
    findBy(key, value) {
        return table.find(record => isEqual(record[key], value));
    },
    select() {
        return table;
    },
    selectBy(key, value) {
        return table.filter(record => isEqual(record[key], value));
    },
    create(record, generateId = true) {
        const result = generateId ? merge(record, {id: uuid()}) : record;

        return table.push(result) && result;
    },
    update(record) {
        const index = table.findIndex(isEqualRecord(record));

        return index < 0 ? null : table[index] = merge(table[index], record);
    },
    delete(record) {
        const index = table.findIndex(isEqualRecord(record));

        return index < 0 ? null : first(table.splice(index, 1));
    }
});

export namespace db {
    export const mocks = createTable<Mock>([]);
}
