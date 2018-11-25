import React from 'react';
import {merge} from 'lodash/fp';
import {withRouter} from 'react-router-dom';
import {List, Button, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from './index.module.scss';

const defaultMock = {
    id: 'new',
    name: '',
    running: false,
    status: {code: 200, message: 'OK'},
    url: {type: 'path', value: ''},
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'],
    headers: [],
    body: {type: 'raw', value: ''}
};

const renderItem = ({id, running, name, url}) => (
    <List.Item className={styles.item}>
        <NavLink to={`/mocks/${id}`}>
            <Icon type="fire" theme={running ? 'filled' : 'outlined'} />
            <span>{name || url.value || 'Unnamed'}</span>
        </NavLink>
    </List.Item>
);

const MockList = ({value, onChange, history}) => {
    const handleNewMock = () => {
        onChange([...value, merge({}, defaultMock)]);
        history.push('/mocks/new');
    };

    return (
        <div className={styles.root}>
            <Button
                type="primary"
                onClick={handleNewMock}
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
}

export default withRouter(MockList);
