import React from 'react';
import {Input, Select} from 'antd';
import styles from './Url.module.scss';

const Url = ({url, onChange}) => (
    <Input.Group className={styles.root} compact>
        <Select
            value={url.type}
            className={styles.select}
            onChange={type => onChange({...url, type})}
        >
            <Select.Option value="path">Path</Select.Option>
            <Select.Option value="regexp">RegExp</Select.Option>
            <Select.Option value="raw">Raw</Select.Option>
        </Select>
        <Input
            value={url.value}
            className={styles.input}
            placeholder="type an URL"
            onChange={event => onChange({...url, value: event.target.value})}
        />
    </Input.Group>
);

export default Url;
