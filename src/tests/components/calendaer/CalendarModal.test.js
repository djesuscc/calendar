import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import moment from "moment";
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import { CalendarModal } from "../../../components/calendar/CalendarModal";
import { eventStartUpdate, eventClearActiveEvent, eventStartNew } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const cloneEnd = now.clone().add(1, 'hour');
const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola Mundo",
      notes: "Some note",
      start: now.toDate(),
      end: cloneEnd.toDate()
    }
  },
  auth: {
    uid: null,
  },
  ui: {
    modalOpen: true,
  }
};
const store = mockStore(initState);

store.dispatch = jest.fn();


const wrapper = mount(
  <Provider store={ store }>
    <CalendarModal />
  </Provider>
)

describe("Test on <CalendarModal />", () => {
  beforeEach(() => {
    //jest.clearAllMocks();
  });

  test('should display modal', () => {
      // expect(wrapper.find(".modal").exists()).toBe(true);
      expect(wrapper.find("Modal").prop('isOpen')).toBe(true);
  });

  test('should called update and close modal', () => {
    wrapper.find("form").simulate("submit", {
      preventDefault(){}
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalled();

  });

  test('should display error if missed title', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });
    expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true);
  });

  test('should create new event', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: null,
      },
      ui: {
        modalOpen: true,
      }
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={ store }>
        <CalendarModal />
      </Provider>
    );
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value:'Hi Daniel'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(eventStartNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hi Daniel',
      notes: '',
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should validate dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value:'Hi Daniel'
      }
    });
    const today = new Date();
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });
    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'End date should be grater', 'error');
  })
  
})