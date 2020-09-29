import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { FirebaseAppProvider } from 'reactfire'

import firebaseConfig from './services/firefase-config'
import App from './routes/App'

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={'Conectando la app...'}>
      <App />
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById('app')
)
