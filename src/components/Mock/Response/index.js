import React from 'react';
import { get } from 'lodash/fp';
import { Card, Checkbox } from 'antd';
import { withStateHandlers } from 'recompose';
import Url from './Url';
import Headers from './Headers';
import styles from './index.module.scss';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];

const data = [
    {
        key: 'Content-type',
        value: 'applicaton/json',
        status: 1
    },
    {
        key: 'x-appid',
        value: '1.0.0',
        status: 0
    }
];

const Response = ({
    url,
    methods,
    setUrl,
    headers,
    setHeaders,
    onMethodChange,
    onAllMethodsChange
}) => {
    const allMethodsChecked = methods.length === httpMethods.length;
    const hasMethodChecked = methods.length > 0 && methods.length < httpMethods.length;

    return (
        <Card className={styles.root} title="Response">
            <Url url={url} onChange={setUrl} />
            <div className={styles.methods}>
                <span>Allow Methods:</span>
                <Checkbox
                    onChange={onAllMethodsChange}
                    checked={allMethodsChecked}
                    indeterminate={hasMethodChecked}
                >
                    All
                </Checkbox>
                <Checkbox.Group onChange={onMethodChange} options={httpMethods} value={methods} />
            </div>
            <Headers headers={headers} onChange={setHeaders} />
        </Card>
    );
};

const enhance = withStateHandlers({
    url: { type: 'path', value: '' },
    methods: [...httpMethods],
    headers: [...data]
}, {
        setUrl: () => url => ({ url }),
        onMethodChange: () => methods => ({ methods }),
        onAllMethodsChange: methods => event => ({ methods: get('target.checked', event) ? [...httpMethods] : [] }),
        setHeaders: () => headers => ({ headers }),
    })

export default enhance(Response);
