import { ActionTypes } from "./types";
import shortid from "shortid";

import {
  createEventDocument,
  removeEventDocument,
  updateParticipants,
  removeParticipant,
} from "../firebase/firebase";

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
        creator: state.user,
        participants: {
          [state.user.id]: state.user,
        },
        id: shortid.generate(),
      };
      createEventDocument(event);
      return {
        ...state,
        events: [...state.events, event],
      };
    case ActionTypes.REMOVE_EVENT:
      let conf = window.confirm("Do your really want to delete the event?");
      if (!conf) {
        return { ...state };
      }
      removeEventDocument(action.payload);
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
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
    case ActionTypes.ENTER_EVENT:
      //look for Event id in events array and update user into participant list
      const { user, eventId } = action.payload;
      updateParticipants(eventId, user);

      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              participants: { ...event.participants, [user.id]: user },
            };
          }
          return event;
        }),
      };
    case ActionTypes.LEAVE_EVENT:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payload.eventId) {
            let newParticipantList = event.participants;
            delete newParticipantList[action.payload.user.id];
            removeParticipant(event.id, newParticipantList);
            return {
              ...event,
              participants: {
                ...newParticipantList,
              },
            };
          }
          return event;
        }),
      };

    default:
      return state;
  }
};

export default reducer;
