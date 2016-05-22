// /////////////////////
// views.js (reducer)
// /////////////////////
import * as messagesTypes from '../constants/MessagesActionTypes';
import * as containerComponentsTypes from '../constants/ContainerComponentsActionTypes';

const initialViews = {
  main        : false,
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
    case containerComponentsTypes.OPEN_CONTAINER_COMPONENTS_UI:
      return {
        ...state,
        main: true
      }
    case containerComponentsTypes.CLOSE_CONTAINER_COMPONENTS_UI:
      return {
        ...state,
        main: false
      }
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
