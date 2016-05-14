import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

/**
 * ////////////////////
 * Settings class
 * ////////////////////
 */
export default class Settings extends React.Component {
  static defaultProps = {
    styles: {
      buttonSettings: {
        right: 12,
        top: 12,
        position: 'absolute'
      }
    }

    // commonStyle - parent's common style
  }

  /**
   * Fired when the settings button is clicked
   * @param {object} event
   */
  handleClickSettings(e) {
    console.log('settings');
  }

  render () {
    return (
      <FlatButton label="settings" style={this.props.styles.buttonSettings}
        onClick={this.handleClickSettings}/>
    )
  }
}
