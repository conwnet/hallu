import React from 'react';
import {Input} from 'antd';
import styles from './Status.module.scss';

const Status = ({value, onChange}) => {
    const {status, message} = value;
    const handleStatusChange = event => onChange({status: +event.target.value, message});
    const handleMessageChange = event => onChange({status, message: event.target.value});

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <div>Status</div>
            </div>
            <div className={styles.content}>
                <Input type="number" value={status} onChange={handleStatusChange} />
                <Input value={message} onChange={handleMessageChange} />
            </div>
        </div>
    );
};

export default Status;
