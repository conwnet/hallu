import React from 'react';
import Header from './Header';
import Mock from './Mock';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styles from './App.module.scss';

const App = () => (
    <Router>
        <div className={styles.root} >
            <Header />
            <Switch>
                <Route path="/mocks/:id?" component={Mock} />
                <Route component={() => <div />} />
            </Switch>
        </div>
    </Router>
);

export default App;
