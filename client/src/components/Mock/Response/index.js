import React from 'react';
import {set, isEqual, mergeWith, isArray} from 'lodash/fp';
import {Button, Card} from 'antd';
import {compose, withStateHandlers, withProps} from 'recompose';
import Name from './Name';
import Url from './Url';
import Methods from './Methods';
import StatusAndMessage from './StatusAndMessage';
import Headers from './Headers';
import Body from './Body';
import styles from './index.module.scss';

const Response = ({
    value,
    change,
    current,
    onChange,
    setChange
}) => {
    const {name, url, methods, response: {status, message, headers, body}} = current;
    const hasDifference = !isEqual(value, current) || value.id === 'new';
    const handleOpen = () => {
        const target = url.value.charAt(0) === '/' ? url.value : '/' + url.value;
        window.open(`http://${window.location.hostname}:5261${target}`);
    };
    const title = (
        <div className={styles.title}>
            <Name value={name} onChange={setChange('name')} />
            <Button onClick={handleOpen} disabled={hasDifference}>
                Open
            </Button>
            <Button type="primary" onClick={() => onChange(current)} disabled={!hasDifference}>
                Save
            </Button>
        </div>
    );

    return (
        <Card className={styles.root} title={title}>
            <Url value={url} onChange={setChange('url')} />
            <Methods value={methods} onChange={setChange('methods')} />
            <div className={styles.response}>
                <div className={styles.header}>
                    <StatusAndMessage
                        status={status}
                        onStatusChange={setChange('response.status')}
                        message={message}
                        onMessageChange={setChange('response.message')}
                    />
                    <Headers value={headers} onChange={setChange('response.headers')} />
                </div>
                <Body value={body} onChange={setChange('response.body')} />
            </div>
        </Card>
    );
};

const mergeStrategy = (a, b) => isArray(a) ? b : undefined;
const withHooks = compose(
    withStateHandlers({change: {}}, {
        setChange: ({change}) => (path, value) => ({change: set(path, value, change)})
    }),
    withProps(props => ({
        current: mergeWith(mergeStrategy, props.value, props.change),
        setChange: path => value => props.setChange(path, value)
    }))
);

export default withHooks(Response);
