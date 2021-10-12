import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../routers/AppRouter';


// jest.mock('../../../actions/events', () => ({
//   eventStartDeleted: jest.fn()
// }))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//store.dispatch = jest.fn();


describe('Test <AppRouter />', () => {
  test('should display public route', () => {
    const initState = {
      auth: {
        uid: null,
        checking: false
      }
    };
    
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('should display private route', () => {
    const initState = {
      calendar:{
        events: []
      },
      ui: {
        modalOpen:false
      },
      auth: {
        uid: 'ABC123',
        checking: false,
        name: 'Daniel',
      }
    }
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  })
})