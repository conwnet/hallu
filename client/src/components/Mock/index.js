import React from 'react';
import {findIndex} from 'lodash/fp';
import {compose, withState, lifecycle} from 'recompose';
import MockList from './MockList';
import Response from './Response';
import {fetchMocks, updateMock} from "../../api";
import {HttpMethods} from "../../constants";
import styles from './index.module.scss';

const createDefaultMock = () => ({
    id: 'new',
    name: '',
    running: false,
    url: {type: 'path', value: ''},
    methods: Object.values(HttpMethods),
    response: {
        status: 200,
        message: 'OK',
        headers: [],
        body: {type: 'raw', raw: '', script: ''}
    }
});


const Mock = ({mocks, setMocks, history, match}) => {
    const {id} = match.params;
    const index = findIndex({id}, mocks);
    const handleMockCreate = () => setMocks([...mocks, createDefaultMock()]);
    const handleMockChange = async mock => {
        const result = await updateMock(mock);

        if (result) {
            setMocks([...mocks.slice(0, index), result, ...mocks.slice(index + 1)]);
            history.push(`/mocks/${result.id}`);
        }
    };

    return (
        <div className={styles.root}>
            <MockList
                value={mocks}
                onChange={handleMockChange}
                onCreate={handleMockCreate}
            />
            {mocks[index] ? <Response value={mocks[index]} onChange={handleMockChange} /> : <div />}
        </div>
    );
};

export default compose(
    withState('mocks', 'setMocks', []),
    lifecycle({
        async componentDidMount() {
            this.props.setMocks(await fetchMocks());
        }
    }),
)(Mock);
