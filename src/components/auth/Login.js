import React from 'react';
import { useDispatch } from 'react-redux';
import './login.css';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const Login = () => {
  
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: 'lola@correo.com',
    loginPassword: '123456'
  });

  const [formRegisterValues, handleRegisterInputChange ] = useForm({
    name: '', 
    email: '', 
    password: '',  
    confirm: ''
  })

  const { loginEmail, loginPassword } = formLoginValues;
  const { 
    name, 
    email, 
    password,  
    confirm
  } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return Swal.fire('Error', 'Passwords are different', 'error');
    }
    dispatch(startRegister(formRegisterValues));
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                name="loginEmail"
                type="text"
                className="form-control"
                placeholder="Email"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                name="loginPassword"
                type="password"
                className="form-control"
                placeholder="Password"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                name="confirm"
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirm}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}