import React from 'react';
import {get, isEqual} from 'lodash/fp';
import {Button, Card} from 'antd';
import {compose, withState} from 'recompose';
import Name from './Name';
import Url from './Url';
import Methods from './Methods';
import StatusAndMessage from './StatusAndMessage';
import Headers from './Headers';
import Body from './Body';
import styles from './index.module.scss';

const Response = ({
    value,
    name,
    url,
    methods,
    status,
    message,
    headers,
    body,
    setName,
    setUrl,
    setMethods,
    setStatus,
    setMessage,
    setHeaders,
    setBody,
    onChange
}) => {
    const buildMock = () => ({
        id: value.id,
        running: value.id === 'new' ? true : value.running,
        name, url, methods, response: {status, message, headers, body}
    });

    const handleSave = () => onChange(buildMock());
    const hasDifference = !isEqual(value, buildMock()) || value.id === 'new';

    const handleOpen = () => {
        const target = url.value.charAt(0) === '/' ? url.value : '/' + url.value;
        window.open(`http://${window.location.hostname}:5261${target}`);
    };


    const title = (
        <div className={styles.title}>
            <Name value={name} onChange={setName} />
            <Button onClick={handleOpen} disabled={hasDifference}>
                Open
            </Button>
            <Button type="primary" onClick={handleSave} disabled={!hasDifference}>
                Save
            </Button>
        </div>
    );

    return (
        <Card className={styles.root} title={title}>
            <Url value={url} onChange={setUrl} />
            <Methods value={methods} onChange={setMethods} />
            <div className={styles.response}>
                <div className={styles.header}>
                    <StatusAndMessage
                        status={status}
                        onStatusChange={setStatus}
                        message={message}
                        onMessageChange={setMessage}
                    />
                    <Headers value={headers} onChange={setHeaders} />
                </div>
                <Body value={body} onChange={setBody} />
            </div>
        </Card>
    );
};

const withHooks = compose(
    withState('name', 'setName', get('value.name')),
    withState('url', 'setUrl', get('value.url')),
    withState('methods', 'setMethods', get('value.methods')),
    withState('status', 'setStatus', get('value.response.status')),
    withState('message', 'setMessage', get('value.response.message')),
    withState('headers', 'setHeaders', get('value.response.headers')),
    withState('body', 'setBody', get('value.response.body'))
);

export default withHooks(Response);
