// /////////////////////
// views.js (reducer)
// /////////////////////
import * as messagesTypes from '../actions/MessageActions';

const initialViews = {
  leadderboard: false,
  messages    : false,
  play        : false,
  settings    : false
}

/**
 * Reducer managing views UI's state
 * state = views
 */
export function views(state = initialViews, action) {
  switch (action.type) {
    case messagesTypes.OPEN_MESSAGE_UI:
      return {
        ...state,
        messages: true
      }
    case messagesTypes.CLOSE_MESSAGE_UI:
      return {
        ...state,
        messages: false
      }
    default:
      return state
  }
}
