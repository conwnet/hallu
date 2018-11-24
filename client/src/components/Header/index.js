import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './index.module.scss';

const Header = () => (
    <div className={styles.root}>
        <div className="root">HALLU</div>
        <NavLink to="/mocks">Mock</NavLink>
        <NavLink to="/requests">Request</NavLink>
        <NavLink to="/rewrites">Rewrite</NavLink>
    </div>
);

export default Header;
