import React, { Component, PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import Layout from './containers/Layout';
import Counter from './components/Counter';
import Rockbar from './components/Rockbar';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class App extends Component {
  static childContextTypes = {
      muiTheme: PropTypes.object,
  }

  getChildContext() {
      return {
          muiTheme: getMuiTheme()
      };
  }

  render() {
    return (
      <Layout>
        <Rockbar />
      </Layout>
    );
  }
}

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
// injectTapEventPlugin();
