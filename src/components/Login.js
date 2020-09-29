import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFirebaseApp, useUser } from 'reactfire'
import 'firebase/auth'

import '../assets/styles/components/Login.css'

const Login = props => {
  const [state, setState] = useState({
    form: {
      email: '',
      password: ''
    }
  })

  const firebase = useFirebaseApp()
  const user = useUser()

  const handleChange = e => {
    setState({
      form: {
        ...state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const login = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(state.form.email, state.form.password)
  }

  const logout = async () => {
    await firebase.auth().signOut()
  }

  return (
    <div className='login background-img'>
      {!user && (
        <form className='login__form' onSubmit={e => handleSubmit(e)}>
          <div className='login__form--container'>
            <h2 className='login-container__title'>Iniciar Sesion</h2>

            <div className='input-item'>
              <label htmlFor='email'>Correo</label>
              <input
                type='email'
                id='email'
                name='email'
                onChange={e => handleChange(e)}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='password'>Contraseña</label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={e => handleChange(e)}
              />
            </div>
            <Link to='/'>
              <button className='insert-button' onClick={login}>
                Iniciar Sesion
              </button>
            </Link>
            <p className='login-container__register'>
              Si no tienes cuenta
              <Link to='/register'> Registrate</Link>
            </p>
          </div>
        </form>
      )}
      {user && <button onClick={logout}>Cerrar Sesion</button>}
    </div>
  )
}

export default Login
