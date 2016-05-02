import React from 'react';
import ReactDOM from 'react-dom';
import hello from './components/hello';

let rootElement = document.querySelector('#container');
class Hello extends React.Component {
    render() {
        return <h1>HELLO B!TCH</h1>
    }
}

ReactDOM.render(
    <Hello/>,
    rootElement
);

<<<<<<< HEAD
=======
// This one does NOT work!
ReactDOM.render(
    <hello/>,
    document.querySelector('.toto')
);
>>>>>>> fd6b593dad280c2d2dbdb918f55fa76b20ff96ee
