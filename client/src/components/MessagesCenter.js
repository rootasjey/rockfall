import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import { connect } from 'react-redux';
import { openMessageUI, closeMessageUI } from '../actions/MessageActions';

/**
 * ////////////////////
 * MessagesCenter class
 * ////////////////////
 */
class MessagesCenter extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleUI = this.handleToggleUI.bind(this);
  }

  PropTypes: {
    viewOpened: PropTypes.bool.isRequired,
    handleToogleUIMessages: PropTypes.func.isRequired;
  }

  static defaultProps = {
    viewOpened: false,

    styles: {
      container: {
        heigt: 40,
        width: 140,
        display: 'inline-block'
      },
      ui: {
        height: 100,
        width: 100,

        opacity: 0,
        display: 'inline-block',
        transition: '0.5s',

        left: 0,
        top: 0,
        position: 'absolute'
      },
      uiOpened: {
        bottom: 60,
        opacity: 1,
        transition: '0.5s'
      },
      buttonUI: {

      }
    }
  }

  /**
   * Fired when the message button is clicked
   * @param {object} event
   */
  handleToggleUI(e) {
    let action = this.props.viewOpened ? closeMessageUI : openMessageUI;
    this.props.handleToogleUIMessages(e, action);
  }

  getUIStyle(viewOpened) {
    if (viewOpened) return this.props.styles.ui;
    return {
      ...this.props.styles.ui,
      opacity: 1,
      transition: '0.5s'
    }
  }

  render () {
    const { viewOpened } = this.props;
    let uiStyle = this.getUIStyle(viewOpened);

    return (
      <div style={this.props.styles.container}>

        <Paper style={uiStyle} zDepth={1} />
        <FlatButton style={this.props.styles.buttonUI} label="messages"
          onClick={ (e) => this.handleToggleUI(e) }/>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleToogleUIMessages: (e, action) => {
      dispatch(action());
    }
  }
}

const mapStateToProps = (state) => {
  const { views } = state;

  return {
    'viewOpened': views.messages
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesCenter);
