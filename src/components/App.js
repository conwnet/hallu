import React from 'react';
import Header from './Header';
import Mock from './Mock';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import styles from './App.module.scss';

const App = () => (
    <Router>
        <div className={styles.root} >
            <Header />
            <Route path="/mock/:id?" component={Mock} />
        </div>
    </Router>
);

export default App;
