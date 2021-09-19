import {
  fetchNoToken,
  fetchToken
} from "../helpers/fetch";
import {
  types
} from "../types/types";
import Swal from 'sweetalert2';
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchNoToken('auth', {
      email,
      password
    }, 'POST');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(login({
        uid: body.uid,
        name: body.name
      }));
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

export const startRegister = (values) => {
  return async (dispatch) => {
    const resp = await fetchNoToken('auth/register', values, 'POST');
    const {
      ok,
      token,
      msg,
      uid,
      name
    } = await resp.json();

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());
      Swal.fire({
        //title: msg,
        text: 'Register Success',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        dispatch(login({
          uid,
          name
        }));
      });
    } else {
      Swal.fire('Error', msg, 'error');
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchToken('auth/renew');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(login({
        uid: body.uid,
        name: body.name
      }));
    } else {
      dispatch(checkingFinish());
    }

  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());  
    dispatch(eventLogout());
  }
}

const logout = () => ({
  type: types.authLogout
})