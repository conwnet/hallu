import React from 'react';
import {withRouter} from 'react-router-dom';
import {List, Button, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import {Mock} from '../../../constants';
import styles from './index.module.scss';

const createDefaultMock = () => ({
    id: 'new',
    name: '',
    status: Mock.Status.Running,
    url: {type: Mock.Url.Type.Path, value: ''},
    methods: Object.values(Mock.Method),
    response: {
        status: {code: 200, message: 'OK'},
        headers: [],
        body: {type: Mock.Response.Body.Type.Raw, value: ''}
    }
});

const renderItem = ({id, name, status, url}) => (
    <List.Item className={styles.item}>
        <NavLink to={`/mocks/${id}`}>
            <Icon type="fire" theme={status === Mock.Status.Running ? 'filled' : 'outlined'} />
            <span>{name || url.value || 'Unnamed'}</span>
        </NavLink>
    </List.Item>
);

const MockList = ({value, onChange, history}) => {
    const handleNewMock = () => {
        onChange([...value, createDefaultMock()]);
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
