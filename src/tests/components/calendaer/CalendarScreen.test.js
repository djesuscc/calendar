import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  calendar: {
    events: []
  },
  auth: {
    uid: null,
  },
  ui: {
    modalOpen: false
  }
};
const store = mockStore(initState);

store.dispatch = jest.fn();


const wrapper = mount(
  <Provider store={ store }>
    <CalendarScreen />
  </Provider>
)

describe('Test on  <CalendarScreen />', () => {
  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('interactions calendar', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);
    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop('onSelectEvent')({ start: 'Hi' });
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hi' });

    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    })
  })
  
})