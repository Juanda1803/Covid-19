import React from 'react'
import PropTypes from 'prop-types'

import '../assets/styles/components/MapContainer.css'

const ImagePreview = ({ dataUrl, isFullscreen }) => {
  let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : ''
  const handleClick = e => {
    e.preventDefault()
    window.localStorage.clear()
  }
  return (
    <div className={'demo-image-preview ' + classNameFullscreen}>
      <img className='coords__photo' src={dataUrl} />
    </div>
  )
}

ImagePreview.propTypes = {
  dataUrl: PropTypes.string,
  isFullscreen: PropTypes.bool
}

export default ImagePreview
