import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFirebaseApp, useUser } from 'reactfire'

import PageLoading from './PageLoading'
import PageError from './PageError'
import '../assets/styles/components/Register.css'
import '../assets/styles/pages/Home.css'

const Register = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    form: {
      name: '',
      lastname: '',
      identificationCard: '',
      adress: '',
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

  const handleClick = async e => {
    setState({ loading: true, error: null })
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(state.form.email, state.form.password)
      setState({ loading: false })
    } catch (error) {
      setState({ loading: false, error: error })
    }
  }
  const errorMsg = state.error && 'El usuario ya existe o hay algun problema'

  const handleSubmit = e => {
    e.preventDefault()
  }
  console.log(state.form.adress)

  if (state.loading) {
    return <PageLoading error={errorMsg} />
  }
  if (state.error) {
    return <PageError />
  }

  return (
    <div className='register background-img'>
      {!user && (
        <form className='register__form' onSubmit={e => handleSubmit(e)}>
          <div className='register__form--container'>
            <h2 className='register-form__title'>Registrate</h2>
            <div className='register-form__itemName'>
              <div className='register-form__itemName-name '>
                <label htmlFor='name'>
                  Nombre
                  <abbr title='required' aria-label='required'>
                    *
                  </abbr>
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  onChange={e => handleChange(e)}
                />
              </div>

              <div className='register-form__itemName-name '>
                <label htmlFor='lastname'>
                  Apellido
                  <abbr title='required' aria-label='required'>
                    *
                  </abbr>
                </label>
                <input
                  id='lastname'
                  type='text'
                  name='lastname'
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className='input-item'>
              <label htmlFor='identificationCard'>
                Cedula de identificacion
                <abbr title='required' aria-label='required'>
                  *
                </abbr>
              </label>
              <input
                type='number'
                id='identificationCard'
                name='identificationCard'
                onChange={e => handleChange(e)}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='adress'>
                Dirrecion
                <abbr title='required' aria-label='required'>
                  *
                </abbr>
              </label>
              <input
                id='adress'
                type='text'
                name='adress'
                onChange={e => handleChange(e)}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='email'>
                Correo
                <abbr title='required' aria-label='required'>
                  *
                </abbr>
              </label>
              <input
                id='email'
                type='email'
                name='email'
                onChange={e => handleChange(e)}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='password'>
                Contraseña
                <abbr title='required' aria-label='required'>
                  *
                </abbr>
              </label>
              <input
                id='password'
                type='password'
                name='password'
                onChange={e => handleChange(e)}
              />
            </div>
            <Link to='/'>
              <button className='insert-button' onClick={e => handleClick(e)}>
                Registrate
              </button>
            </Link>
            <p className='login-container__register'>
              ¿Ya tienes cuenta?
              <Link to='/login'> Iniciar Sesion</Link>
              {state.error && { errorMsg }}
            </p>
          </div>
        </form>
      )}
    </div>
  )
}

export default Register
