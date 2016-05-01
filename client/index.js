import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import hello from './components/hello'

let rootElement = document.body;

React.render(
    <hello/>,
    rootElement
);
