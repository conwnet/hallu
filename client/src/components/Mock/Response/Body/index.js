import React from 'react';
import {Radio} from 'antd';
import Editor from './Editor';
import styles from './index.module.scss';

const Body = ({value: body, onChange}) => {
    const {type, value} = body;
    const handleTypeChange = event => onChange({type: event.target.value, value});
    const handleContentChange = value => onChange({type, value});

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <div>Body</div>
                <Radio.Group value={type} onChange={handleTypeChange} buttonStyle="solid">
                    <Radio.Button value="raw">Raw</Radio.Button>
                    <Radio.Button value="script">Script</Radio.Button>
                </Radio.Group>
            </div>
            <Editor className={styles.editor} value={value} onChange={handleContentChange} />
        </div>
    );
};

export default Body;
