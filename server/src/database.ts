/**
 * @file Simple Data Persistence API
 * @author zhangguoqing02
 */

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid/v1';
import {first, isEqual} from 'lodash/fp';
import {Mock, Record, Table} from './types'

const dbFile = path.join(os.homedir(), '.hallu.json');

const load = () => {
    try {
        if (!fs.existsSync(dbFile)) {
            fs.writeFileSync(dbFile, '{mocks:[]}');
        }
        return JSON.parse(fs.readFileSync(dbFile).toString());
    } catch (e) {
        return {mocks:[]};
    }
};

const sync = table => {
    try {
        fs.writeFileSync(dbFile, JSON.stringify({mocks: table}));
        return true;
    } catch (e) {
        return false;
    }
};

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
        const result = generateId ? Object.assign(record, {id: uuid()}) : record;

        return table.push(result) && sync(table) && result;
    },
    update(record) {
        const index = table.findIndex(isEqualRecord(record));
        const result = Object.assign(table[index], record);

        return index < 0 ? null :  sync(table) && result;
    },
    delete(record) {
        const index = table.findIndex(isEqualRecord(record));
        const result = first(table.splice(index, 1));

        return index < 0 ? null : sync(table) && result;
    }
});

export namespace db {
    export const mocks = createTable<Mock>(load().mocks);
}
