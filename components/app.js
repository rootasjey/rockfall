// import '../libs/material.min.js';
// import 'style-loader!raw-loader!../libs/material.min.css';
// import '../libs/material.min.css';

import { h, Component } from 'preact';
import { Router } from 'preact-router';

// import Navbar from './navbar';
import Home from './home';

export default class App extends Component {
  static defaultProps = {
    isConnected: false,

    styles: {
      container: {
        height: '100%',
        width: '100%'
      }
    }
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div class='app' style={this.props.styles.container}>
          <Router onChange={this.handleRoute}>
            <Home path='/'/>
          </Router>
      </div>
    )
  }
}
