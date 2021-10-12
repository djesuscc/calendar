import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
Storage.prototype.setItem = jest.fn();
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

describe('Test on actions auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks()
  });

  test('startLogin correct ', async () => {
    await store.dispatch(startLogin('dan@correo.com', '123456'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    })
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('startLogin incorrect', async () => {
    await store.dispatch(startLogin('dan@correo.com', '123456789'));
    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password invalid', 'error');

    await store.dispatch(startLogin('dan2@correo.com', '123456'));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'User doesn\'t exists', 'error');
  });

  test('startRegister correct', async () => {
    let actions = null;

    fetchModule.fetchNoToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Calabaza',
          token: 'ABC1234DEF'
        }
      }
    }))
    await store.dispatch(startRegister({ email: 'fery@correo.com', password: '123456', name: 'Fery' }));
    actions = await store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Calabaza'
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC1234DEF');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('startChecking correct', async () => {
    fetchModule.fetchToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Calabaza',
          token: 'ABC1234DEF'
        }
      }
    }))
    await store.dispatch( startChecking() );
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Calabaza'
      }
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC1234DEF');
  });
  
})