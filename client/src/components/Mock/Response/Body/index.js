import React from 'react';
import {Radio} from 'antd';
import Editor from './Editor';
import styles from './index.module.scss';

const Body = ({value, onChange}) => {
    const type = value.type;
    const handleTypeChange = event => onChange({...value, type: event.target.value});
    const handleContentChange = text => onChange({...value, [type]: text});

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <div>Body</div>
                <Radio.Group value={type} onChange={handleTypeChange} buttonStyle="solid">
                    <Radio.Button value="raw">Raw</Radio.Button>
                    <Radio.Button value="script">Script</Radio.Button>
                </Radio.Group>
            </div>
            <Editor className={styles.editor} value={value[type]} onChange={handleContentChange} />
        </div>
    );
};

export default Body;
