import React from 'react';
import {List, Button, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from './index.module.scss';

const list = [
    {
        id: 1,
        name: 'mock1',
        url: '/mock/1',
        status: 1
    }
];

const renderItem = item => (
    <List.Item className={styles.item}>
        <NavLink to={item.url}>
            <Icon type="fire" theme={item.status ? 'filled' : 'outlined'} />
            <span>{item.name}</span>
        </NavLink>
    </List.Item>
);

class MockList extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <Button type="primary">
                    新建
                </Button>
                <List
                    dataSource={list}
                    renderItem={renderItem}
                />
            </div>
        );
    }
}

export default MockList;
