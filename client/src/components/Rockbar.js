import React, { PropTypes } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
      },
      buttonPlay: {
        left: '40%',
        position: 'relative'
      },
      buttonSettings: {
        right: 12,
        top: 12,
        position: 'absolute'
      }
    }
  }

  /**
   * Fired when the play button is clicked
   * @param {object} event
   */
  handleClickPlay(e) {
    console.log('play');
  }

  /**
   * Fired when the leader button is clicked
   * @param {object} event
   */
  handleClickLeader(e) {
    console.log('leader');
  }

  /**
   * Fired when the message button is clicked
   * @param {object} event
   */
  handleClickMessages(e) {
    console.log('msg');
  }

  /**
   * Fired when the settings button is clicked
   * @param {object} event
   */
  handleClickSettings(e) {
    console.log('settings');
  }

  render() {
    return (
      <Toolbar style={this.props.styles.toolbar} >
        <ToolbarTitle text="rockfall" style={this.props.styles.button} />

        <RaisedButton label="play" style={this.props.styles.buttonPlay}
          labelColor='white' backgroundColor='#e74c3c'
          onClick={this.handleClickPlay}/>
        <FlatButton label="leadderboard" style={this.props.styles.button}
          onClick={this.handleClickLeader}/>
        <FlatButton label="messages" style={this.props.styles.button}
          onClick={this.handleClickMessages}/>
        <FlatButton label="settings" style={this.props.styles.buttonSettings}
          onClick={this.handleClickSettings}/>
      </Toolbar>
    );
  }
}
