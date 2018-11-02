import React from 'react';
import {Table, Input} from 'antd';
import styles from './Headers.module.scss';

const rowSelection = {
    onChange: console.log
};

const MyTable = ({ dataSource, columns }) => {
    return dataSource.map((row, index) => (
        <tr>
            {columns.map(col => (
                <td>{col.render(row[col.dataIndex], row, index)}</td>
            ))}
        </tr>
    ));
};

const replace = (array, index, item) => array.slice(0, index).concat(item, array.slice(index + 1));

const Headers = ({headers, onChange}) => {
    const columns = [{
        title: 'Key',
        dataIndex: 'key',
        render(key, header, index) {
            const handleKeyChange = event => {
                // why lost focus when the object key named 'key'
                onChange(replace(headers, index, {...header, key: event.target.value}));
            };

            return <Input value={key} onChange={handleKeyChange} />;
        }
    }, {
        title: 'Value',
        dataIndex: 'value',
        render(value, header, index) {
            const handleValueChange = event => {
                onChange(replace(headers, index, {...header, value: event.target.value}));
            };

            return <Input value={value} onChange={handleValueChange} />;
        }
    }];

    console.log(headers)

    return (
        <Table
            className={styles.root}
            style={{width: '45%'}}
            rowSelection={rowSelection}
            dataSource={headers}
            columns={columns}
            pagination={false}
            bordered
        />
    );
};

export default Headers;
