import React from 'react';
import {get} from 'lodash/fp';
import {Button, Card} from 'antd';
import {compose, withState} from 'recompose';
import Name from './Name';
import Url from './Url';
import Methods from './Methods';
import Status from './Status';
import Headers from './Headers';
import Body from './Body';
import {updateMock} from "../../../api";
import styles from './index.module.scss';

const Response = ({
    id,
    name,
    status,
    url,
    methods,
    headers,
    body,
    setName,
    setStatus,
    setUrl,
    setMethods,
    setHeaders,
    setBody,
    onChange
}) => {
    const handleSave = async () => {
        const mock = {id, name, url, status: 1, methods, response: {status, headers, body}};

        onChange(await updateMock(mock));
    };

    const title = (
        <div className={styles.title}>
            <Name value={name} onChange={setName} />
            <Button>Run</Button>
            <Button type="primary" onClick={handleSave}>
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
                    <Status value={status} onChange={setStatus} />
                    <Headers value={headers} onChange={setHeaders} />
                </div>
                <Body value={body} onChange={setBody} />
            </div>
        </Card>
    );
};

const withHooks = compose(
    withState('id', 'setId', get('value.id')),
    withState('name', 'setName', get('value.name')),
    withState('url', 'setUrl', get('value.url')),
    withState('methods', 'setMethods', get('value.methods')),
    withState('status', 'setStatus', get('value.response.status')),
    withState('headers', 'setHeaders', get('value.response.headers')),
    withState('body', 'setBody', get('value.response.body'))
);

export default withHooks(Response);
