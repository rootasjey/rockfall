import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

/**
 * ////////////////////
 * MessagesCenter class
 * ////////////////////
 */
export default class MessagesCenter extends React.Component {
  static defaultProps = {
    styles: {

    }

    // commonStyle - parent's common style
  }

  /**
   * Fired when the message button is clicked
   * @param {object} event
   */
  handleClickMessages(e) {
    console.log('msg');
  }

  render () {
    return (
      <FlatButton label="messages"
        onClick={this.handleClickMessages}/>
    )
  }
}
