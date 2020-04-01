import { ActionTypes } from "./types";

const INITIAL_STATE = {
  isModalOpen: false,
  events: [],
  positionOfActualEvent: {}
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
      console.log(event);
      return {
        ...state,
        events: [...state.events, event]
      };

    case ActionTypes.SET_ACTUAL_POSITION:
      return {
        ...state,
        positionOfActualEvent: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
