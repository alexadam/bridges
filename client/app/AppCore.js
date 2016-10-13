import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
// import { createStore, combineReducers} from 'redux';
// import { Provider } from 'react-redux';

import Main from './Main';

const App = () => (
    <Main/>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
