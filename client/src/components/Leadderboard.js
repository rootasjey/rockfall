import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

/**
 * ////////////////////
 * Leadderboard class
 * ////////////////////
 */
export default class Leadderboard extends React.Component {
  static defaultProps = {
    styles: {

    }

    // commonStyle - parent's common style
  }

  /**
   * Fired when the leader button is clicked
   * @param {object} event
   */
  handleClickLeader(e) {
    console.log('leader');
  }

  render () {
    return (
      <FlatButton label="leadderboard" style={this.props.styles.button}
        onClick={this.handleClickLeader}/>
    )
  }
}
