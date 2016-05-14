import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

/**
 * ////////////////////
 * Settings class
 * ////////////////////
 */
export default class Settings extends React.Component {
  static defaultProps = {
    styles: {
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
      <RaisedButton label="play" style={this.props.styles.buttonPlay}
        labelColor='white' backgroundColor='#e74c3c'
        onClick={this.handleClickPlay}/>
    )
  }
}
