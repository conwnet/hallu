import React from 'react';
import {Input, Select} from 'antd';
import styles from './Url.module.scss';

const Url = ({value: url, onChange}) => {
    const {type, value} = url;

    return (
        <Input.Group className={styles.root} compact>
            <Select
                value={type}
                className={styles.select}
                onChange={type => onChange({type, value})}
            >
                <Select.Option value="path">Path</Select.Option>
                <Select.Option value="regexp">RegExp</Select.Option>
                <Select.Option value="raw">Raw</Select.Option>
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
