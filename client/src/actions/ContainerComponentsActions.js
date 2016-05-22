import * as types from '../constants/ContainerComponentsActionTypes';

export function openContainerComponentsUI() {
  return { type: types.OPEN_CONTAINER_COMPONENTS_UI }
}

export function closeContainerComponentsUI() {
  return { type: types.CLOSE_CONTAINER_COMPONENTS_UI }
}
