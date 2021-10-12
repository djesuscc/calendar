import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDeleted } from '../../../actions/events';


jest.mock('../../../actions/events', () => ({
  eventStartDeleted: jest.fn()
}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();


const wrapper = mount(
  <Provider store={ store }>
    <DeleteEventFab />
  </Provider>
)

describe('Test <DeleteEventFab />', () => {
  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should called eventStartDelete function when is clicked', () => {
    wrapper.find('button').simulate('click');
    expect(eventStartDeleted).toHaveBeenCalled();
  });
})