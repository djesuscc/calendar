import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [{
    id: new Date().getTime(),
    title: 'Birth Day',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    allDay: true,
    notes: 'Felicitar',
    user: {
      _id: 123,
      name: 'Daniel',
    }
    //resource?: any,
  }],
  activeEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null
      }
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(
          (event) => (event.id !== action.payload.id) ? event : action.payload
        )
      }
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== state.activeEvent.id),
        activeEvent: null,
      }
    default:
      return state;
  }
}