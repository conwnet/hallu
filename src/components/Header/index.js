import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './index.module.scss';

const Header = () => (
    <div className={styles.root}>
        <div className="root">HALLU</div>
        <NavLink to="/mock">Mock</NavLink>
        <NavLink to="/request">Request</NavLink>
        <NavLink to="/rewrite">Rewrite</NavLink>
    </div>
);

export default Header;
