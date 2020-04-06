import { ActionTypes } from "./types";
import shortid from "shortid";

import { createEventDocument, getAllEvents } from "../firebase/firebase";

const INITIAL_STATE = {
  isModalOpen: false,
  events: [],
  positionOfActualEvent: {},
  user: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case ActionTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case ActionTypes.CREATE_EVENT:
      const event = {
        ...action.payload,
        position: state.positionOfActualEvent,
        user: state.user,
        id: shortid.generate(),
      };

      createEventDocument(event);
      return {
        ...state,
        events: [...state.events, event],
      };

    case ActionTypes.SET_ALL_EVENTS:
      return {
        ...state,
        events: [...action.payload],
      };

    case ActionTypes.SET_ACTUAL_POSITION:
      return {
        ...state,
        positionOfActualEvent: action.payload,
      };
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
