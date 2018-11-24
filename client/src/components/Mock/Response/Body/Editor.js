import React from 'react';
import classNames from 'classnames';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import styles from './Editor.module.scss';

const options = {
    mode: 'text/javascript',
    lineNumbers: true,
    theme: 'material',
    indentUnit: 4,
    matchBrackets: true,
    autoCloseBrackets: true
};

const TextEditor = ({value, onChange, className}) => (
    <CodeMirror
        value={value}
        options={options}
        onBeforeChange={(e, d, v) => onChange(v)}
        className={classNames(styles.root, className)}
    />
);

export default TextEditor;
