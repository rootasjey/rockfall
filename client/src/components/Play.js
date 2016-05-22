import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

/**
 * ////////////////////
 * Play class
 * ////////////////////
 */
export default class Play extends React.Component {
  static defaultProps = {
    styles: {
      container: {
        display: 'none'
      },
      buttonPlay: {
        left: '28%',
        position: 'relative'
      }
    }

    // commonStyle - parent's common style
  }

  /**
   * Fired when the play button is clicked
   * @param {object} event
   */
  handleClickPlay(e) {
    console.log('play');
  }

  render () {
    return (
      <Paper style={this.props.styles.container} zDepth={0}></Paper>
    )
  }
}
