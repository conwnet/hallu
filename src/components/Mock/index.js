import React from 'react';
import MockList from './MockList';
import Response from './Response';
import styles from './index.module.scss';

const Mock = () => {
    return (
        <div className={styles.root}>
            <MockList />
            <Response onChange={() => {}} />
        </div>
    );
};

export default Mock;
