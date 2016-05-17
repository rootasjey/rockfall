// //////////
// Rockbar.js
// //////////
import React, { PropTypes } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// Custom components
import MessagesCenter from '../components/MessagesCenter';
import Leadderboard from '../components/Leadderboard';
import Settings from '../components/Settings';
import Play from '../components/Play';

var Logo = require('../assets/icons/rockfall_0.svg');

/**
 * /////////////
 * Toolbar class
 * /////////////
 */
export default class Rockbar extends React.Component {
  /**
   * Default properties
   */
  static defaultProps = {
    /**
     * Component's styles definition
     */
    styles: {
      logo: {
        cursor: 'pointer',

        marginTop: 10,

        top: 5,
        position: 'relative'
      },
      toolbar: {
        bottom: 0,
        left: 0,
        position: 'absolute',

        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',

        // boxShadow: '0 0 10px #000000'
      },
      button: {
        marginRight: 10
      }
    },
    /**
     * Component's children styles definition
     */
    commonChildStyle: {
      button: {
        marginRight: 10
      }
    }
  }

  render() {
    return (
      <Toolbar style={this.props.styles.toolbar} >
        <Logo style={this.props.styles.logo} />

        <Leadderboard />
        <MessagesCenter />
        <Settings />
        <Play />
      </Toolbar>
    );
  }
}
