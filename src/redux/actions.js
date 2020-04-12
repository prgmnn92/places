import { ActionTypes } from './types';

export const openModal = () => ({
	type: ActionTypes.OPEN_MODAL
});

export const closeModal = () => ({
	type: ActionTypes.CLOSE_MODAL
});

export const createEvent = (event) => ({
	type: ActionTypes.CREATE_EVENT,
	payload: event
});

export const setAllEvents = (events) => ({
	type: ActionTypes.SET_ALL_EVENTS,
	payload: events
});

export const setActualPosition = (position) => ({
	type: ActionTypes.SET_ACTUAL_POSITION,
	payload: position
});

export const setCurrentUser = (user) => ({
	type: ActionTypes.SET_CURRENT_USER,
	payload: user
});

export const removeEvent = (id) => ({
	type: ActionTypes.REMOVE_EVENT,
	payload: id
});

export const enterEvent = (eventId, user) => ({
	type: ActionTypes.ENTER_EVENT,
	payload: { eventId, user }
});
