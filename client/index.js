import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';

let rootElement = document.querySelector('#container');
class Greetings extends React.Component {
    render() {
        return <h1>HELLO B!TCH</h1>
    }
}

ReactDOM.render(
    <Greetings/>,
    rootElement
);

// This one does NOT work!
ReactDOM.render(
    <Hello date={Date.now()}/>,
    document.querySelector('.toto')
);
