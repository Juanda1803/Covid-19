import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useUser } from 'reactfire'

import MapUsers from '../components/MapUsers'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Maps from '../pages/Maps'
import Login from '../components/Login'
import Register from '../components/Register'
import FileUpload from '../components/FileUpload'
import '../assets/styles/global.css'

const App = () => {
  const user = useUser()
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {!user && <Route exact path='/' component={Home} />}
          {user && <Route exact path='/' component={Maps} />}
          <Route exact path='/user' component={MapUsers} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/phote' component={FileUpload} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
