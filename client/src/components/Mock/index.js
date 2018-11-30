import React from 'react';
import {findIndex} from 'lodash/fp';
import {compose, withState, lifecycle} from 'recompose';
import MockList from './MockList';
import Response from './Response';
import {fetchMocks} from "../../api";
import styles from './index.module.scss';

const Mock = ({mocks, setMocks, history, match}) => {
    const {id} = match.params;
    const index = findIndex({id}, mocks);
    const handleMockChange = mock => {
        setMocks([...mocks.slice(0, index), mock, ...mocks.slice(index + 1)]);
        history.push(`/mocks/${mock.id}`);
    };

    return (
        <div className={styles.root}>
            <MockList
                value={mocks}
                onChange={setMocks}
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
