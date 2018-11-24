import React from 'react';
import {get} from 'lodash/fp';
import {Checkbox} from 'antd';
import styles from './Methods.module.scss';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];

const Methods = ({value, onChange}) => {
    const allMethodsChecked = value.length === httpMethods.length;
    const hasMethodChecked = value.length > 0 && value.length < httpMethods.length;
    const handleCheckedAllChange = event => onChange(get('target.checked', event) ? [...httpMethods] : []);

    return (
        <div className={styles.root}>
            <span>Allow Methods:</span>
            <Checkbox
                checked={allMethodsChecked}
                indeterminate={hasMethodChecked}
                onChange={handleCheckedAllChange}
            >
                All
            </Checkbox>
            <Checkbox.Group options={httpMethods} value={value} onChange={onChange} />
        </div>
    );
}

export default Methods;
