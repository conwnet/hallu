import React from 'react';
import {Input} from 'antd';
import styles from './Status.module.scss';

const Status = ({value, onChange}) => {
    const {code, message} = value;
    const handleCodeChange = event => onChange({code: event.target.value, message});
    const handleMessageChange = event => onChange({code, message: event.target.value});

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <div>Status</div>
            </div>
            <div className={styles.content}>
                <Input type="number" value={code} onChange={handleCodeChange} />
                <Input value={message} onChange={handleMessageChange} />
            </div>
        </div>
    );
};

export default Status;
