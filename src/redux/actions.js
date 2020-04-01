import { ActionTypes } from "./types";

export const openModal = () => ({
  type: ActionTypes.OPEN_MODAL
});

export const closeModal = () => ({
  type: ActionTypes.CLOSE_MODAL
});

export const createEvent = event => ({
  type: ActionTypes.CREATE_EVENT,
  payload: event
});

export const setActualPosition = position => ({
  type: ActionTypes.SET_ACTUAL_POSITION,
  payload: position
});
