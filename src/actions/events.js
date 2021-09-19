import Swal from 'sweetalert2';
import { fetchToken } from '../helpers/fetch';
import { preparerEvents } from '../helpers/preparerEvents';
import { types } from '../types/types';

export const eventStartNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchToken('events', event, 'POST');
      const body = await resp.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name
        }
        dispatch(eventAddNew(event));
        Swal.fire('Success', 'Event Created', 'success');
      } else {
        Swal.fire('Error', 'Missing Params', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Please contact admin', 'error');
    }
  }
}

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActive
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }

    } catch (error) {
      console.log(error);
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventStartDeleted = () => {
  return async (dispatch, getState) => {
    const { activeEvent } = getState().calendar;
    try {
      const resp = await fetchToken(`events/${activeEvent.id}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
const eventDeleted = () => ({
  type: types.eventDeleted
})

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken('events');
      const body = await resp.json();
      const events = preparerEvents(body.events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
});

export const eventLogout = () => ({
  type: types.eventLogout
})