import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { Login } from '../../../components/auth/Login';
import { startLogin, startRegister } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={ store }>
    <Login />
  </Provider>
)


describe('Test on <LoginScreen />', () => {
  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should called login dispatch', () => {
    wrapper.find('input[name="loginEmail"]').simulate('change', {
      target: {
        name: 'loginEmail',
        value: 'lola@correo.com'
      }
    });

    wrapper.find('input[name="loginPassword"]').simulate('change', {
      target: {
        name: 'loginPassword',
        value: '123456'
      }
    });

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault(){}
    });

    expect(startLogin).toHaveBeenCalledWith('lola@correo.com', '123456');
  });

  test('There is not record if passwords are different', () => {
    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'Lourdes'
      }
    });

    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'lulu@correo.com'
      }
    });

    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: '123456'
      }
    });

    wrapper.find('input[name="confirm"]').simulate('change', {
      target: {
        name: 'confirm',
        value: '12345'
      }
    })

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith('Error', expect.any(String), 'error');
  });
  
  test('Register with same passwords', () => {
    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'Lourdes'
      }
    });

    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'lulu@correo.com'
      }
    });

    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: '123456'
      }
    });

    wrapper.find('input[name="confirm"]').simulate('change', {
      target: {
        name: 'confirm',
        value: '123456'
      }
    })

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    });

    expect(startRegister).toHaveBeenCalledWith({name: 'Lourdes', email: 'lulu@correo.com', password: '123456', confirm: '123456'});
    expect(Swal.fire).not.toHaveBeenCalled()
  })
  
  
})