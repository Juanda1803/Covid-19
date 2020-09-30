import React from 'react'

import '../assets/styles/components/PageError.css'

const PageError = props => {
  return <div className='PageError'>X{props.error.message}X</div>
}
export default PageError
