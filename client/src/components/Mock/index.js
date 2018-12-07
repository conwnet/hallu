import React from 'react';
import {findIndex, find} from 'lodash/fp';
import {compose, withState, lifecycle} from 'recompose';
import MockList from './MockList';
import Response from './Response';
import {createDefaultMock} from './utils';
import {fetchMocks, updateMock} from "../../api";
import styles from './index.module.scss';


const Mock = ({mocks, setMocks, history, match}) => {
    const handleMockCreate = () => {
        setMocks([...mocks, createDefaultMock()]);
        history.push(`/mocks/new`);
    };
    const handleMockChange = async mock => {
        const result = await updateMock(mock);
        const index = findIndex({id: mock.id}, mocks);
        const position = index < 0 ? findIndex({id: 'new'}, mocks) : index;

        if (result && position >= 0) {
            setMocks([...mocks.slice(0, position), result, ...mocks.slice(position + 1)]);
            history.push(`/mocks/${result.id}`);
        }
    };
    const mock = find({id: match.params.id}, mocks);

    return (
        <div className={styles.root}>
            <MockList
                value={mocks}
                onChange={handleMockChange}
                onCreate={handleMockCreate}
            />
            {mock ? <Response value={mock} onChange={handleMockChange} /> : <div />}
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
