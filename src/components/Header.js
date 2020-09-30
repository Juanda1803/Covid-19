import React from 'react'
import { Link } from 'react-router-dom'
import { useFirebaseApp, useUser } from 'reactfire'
import ImageCovid from '../assets/static/icons8-virus-48.png'
import '../assets/styles/components/Header.css'

const Header = () => {
  const firebase = useFirebaseApp()
  const user = useUser()
  const logout = async () => {
    await firebase.auth().signOut()
  }
  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__container--logo'>
          <img className='header-logo__image' src={ImageCovid} alt='covid' />
          <h1 className='header-logo__title'>Covid-19</h1>
        </Link>
        <div className='header__container--logout'>
          {user && (
            <>
              <h3 className='header__user'>{user.email}</h3>
              <button className='in-button' onClick={logout}>
                Cerrar Sesion
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
