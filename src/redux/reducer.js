import { ActionTypes } from './types';

const INITIAL_STATE = {
	isModalOpen: false,
	events: [
		{
			title: 'First Title Ever',
			text: 'This is an Event and This is an Event',
			position: {
				lat: 34.04924594193164,
				lng: -118.24104309082031
			}
		}
	],
	positionOfActualEvent: {},
	user: {}
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.OPEN_MODAL:
			return {
				...state,
				isModalOpen: true
			};
		case ActionTypes.CLOSE_MODAL:
			return {
				...state,
				isModalOpen: false
			};
		case ActionTypes.CREATE_EVENT:
			const event = {
				...action.payload,
				position: state.positionOfActualEvent
			};
			return {
				...state,
				events: [ ...state.events, event ]
			};

		case ActionTypes.SET_ACTUAL_POSITION:
			return {
				...state,
				positionOfActualEvent: action.payload
			};
		case ActionTypes.SET_CURRENT_USER:
			return {
				...state,
				user: action.payload
			};

		default:
			return state;
	}
};

export default reducer;
