import React from 'react';
import {List, Button, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from './index.module.scss';

const MockList = ({value, onChange, onCreate}) => {
    const renderItem = ({id, name, running, url}) => {
        const handleRunningStatusChange = () => {
            if (id !== 'new') {
                onChange({id, running: !running});
            }
        };
        return (
            <List.Item className={styles.item}>
                <NavLink to={`/mocks/${id}`}>
                    <Icon
                        type="fire"
                        className={{[styles.running]: running}}
                        theme={running ? 'filled' : 'outlined'}
                        onClick={handleRunningStatusChange}
                    />
                    <span>
                    {name || url.value || id.slice(0, 8)}
                </span>
                    <Icon type="delete" theme="filled"/>
                </NavLink>
            </List.Item>
        );
    };

    return (
        <div className={styles.root}>
            <Button
                type="primary"
                onClick={onCreate}
                disabled={value.some(({id}) => id === 'new')}
            >
                Create New
            </Button>
            <List
                dataSource={value}
                renderItem={renderItem}
            />
        </div>
    );
};

export default MockList;
