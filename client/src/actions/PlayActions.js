import * as types from '../constants/PlayActionTypes';

export function openPlayUI() {
  return { type: types.OPEN_PLAY_UI }
}

export function closePlayUI() {
  return { type: types.CLOSE_PLAY_UI }
}
