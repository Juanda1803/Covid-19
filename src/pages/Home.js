import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from 'reactfire'

import Information from '../components/Information'
import '../assets/styles/pages/Home.css'

const Home = () => {
  return (
    <>
      <Information />
      <div className='home background-img'>
        <div className='home__container'>
          <Link className='home__container--item' to='/login'>
            <h1>Inicia Sesión</h1>
          </Link>
          <Link className='home__container--item' to='/register'>
            <h1>Registrate</h1>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
