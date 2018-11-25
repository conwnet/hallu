import React from 'react';
import {Input, Select} from 'antd';
import styles from './Url.module.scss';

const {Option} = Select;

const Url = ({value: url, onChange}) => {
    const {type, value} = url;

    return (
        <Input.Group className={styles.root} compact>
            <Select
                value={type}
                className={styles.select}
                onChange={type => onChange({type, value})}
            >
                <Option value="path">Path</Option>
                <Option value="regexp">RegExp</Option>
                <Option value="raw">Raw</Option>
            </Select>
            <Input
                value={value}
                className={styles.input}
                placeholder="type an URL"
                onChange={event => onChange({type, value: event.target.value})}
            />
        </Input.Group>
    );
};

export default Url;
