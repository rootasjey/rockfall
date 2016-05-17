import * as types from '../constants/MessagesActionTypes';

export function openMessageUI() {
  return { type: types.OPEN_MESSAGE_UI }
}

export function closeMessageUI() {
  return { type: types.CLOSE_MESSAGE_UI }
}

export function sendMessage(message, from, to) {
  return {
    type: types.SEND_MESSAGE,
    message,
    from,
    to
  }
}
