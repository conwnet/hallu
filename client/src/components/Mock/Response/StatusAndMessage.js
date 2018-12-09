import React from 'react';
import {Input} from 'antd';
import styles from './StatusAndMessage.module.scss';

const StatusAndMessage = ({status, onStatusChange, message, onMessageChange}) => {
    const handleStatusChange = event => onStatusChange(+event.target.value);
    const handleMessageChange = event => onMessageChange(event.target.value);

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <div>Status & Message</div>
            </div>
            <div className={styles.content}>
                <Input type="number" value={status} onChange={handleStatusChange} />
                <Input value={message} onChange={handleMessageChange} />
            </div>
        </div>
    );
};

export default StatusAndMessage;
