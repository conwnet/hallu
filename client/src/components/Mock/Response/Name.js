import React from 'react';
import {Input, Icon} from 'antd';
import {withState} from 'recompose';
import styles from './Name.module.scss';

const Name = ({value, editing, onChange, setEditing}) => (
    <span className={styles.root}>
        {editing
            ? (
                <Input
                    value={value}
                    className={styles.input}
                    onBlur={() => setEditing(false)}
                    onChange={event => onChange(event.target.value)}
                    ref={element => element && element.focus()}
                />
            ) : (
                <>
                    <span>{value || 'Unnamed'}</span>
                    <Icon type="edit" onClick={() => setEditing(true)} />
                </>
            )
        }
    </span>
);

export default withState(
    'editing', 'setEditing', false
)(Name);
