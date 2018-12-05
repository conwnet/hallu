import React from 'react';
import {Table, Input, Icon} from 'antd';
import styles from './Headers.module.scss';

const Headers = ({value, onChange}) => {
    const replace = (index, item) => [...value.slice(0, index), item, ...value.slice(index + 1)];
    const columns = [{
        title: 'Key',
        dataIndex: 'key',
        render(text, record, index) {
            const handleChange = event => {
                onChange(replace(index, {...record, key: event.target.value}));
            };

            return <Input value={text} onChange={handleChange} />;
        }
    }, {
        title: 'Value',
        dataIndex: 'value',
        render(text, record, index) {
            const handleChange = event => {
                onChange(replace(index, {...record, value: event.target.value}));
            };

            return <Input value={text} onChange={handleChange} />;
        }
    }, {
        key: 'action',
        render(text, record, index) {
            const handleRemove = () => onChange([...value.slice(0, index), ...value.slice(index + 1)]);

            return <Icon type="minus-circle" onClick={handleRemove} className={styles.delete} />;
        }
    }];

    const rowSelection = {
        onChange: keys => onChange(value.map((item, index) => {
            return {...item, using: keys.some(key => +key === +index) ? true : false};
        })),
        selectedRowKeys: value.reduce((prev, {using}, index) => using ? [...prev, index] : prev, [])
    };

    const handleAdd = () => onChange([...value, {key: '', value: '', using: true}]);

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <span>Header</span>
                <span className={styles.buttons}>
                    <Icon type="plus-circle" onClick={handleAdd} />
                </span>
            </div>
            <Table
                className={styles.table}
                rowSelection={rowSelection}
                dataSource={value}
                columns={columns}
                pagination={false}
                rowKey={(v, i) => i}
                bordered
            />
        </div>
    );
};

export default Headers;
