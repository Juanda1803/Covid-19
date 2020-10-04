import React, { useEffect, useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { useLocation } from 'react-router-dom'
import { IconLocation } from './IconLocation'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import firebase from 'firebase'

import ImagePreview from './ImagePreview'
import MarkersUsers from './MarkersUsers'
import 'leaflet/dist/leaflet.css'
import '../assets/styles/components/MapContainer.css'
import uploadImage from './uploadImage'
import { value } from 'numeral'
import useLocalStorage from '../hooks/useLocalStorage'

const proxyurl = 'https://cors-anywhere.herokuapp.com/'

const MapUsers = () => {
  const location = useLocation()
  const [state, setState] = useState({
    loading: false,
    error: false,
    data: {
      results: []
    },
    currentLocation: {
      lat: location.state.latitude,
      lng: location.state.longitude
    },
    zoom: 12
  })

  const [dataUrl, setDataUrl] = useLocalStorage('photo', '')

  const API_HOSPITAL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.state.latitude},${location.state.longitude}&radius=10000&types=hospital&name=hospital&key=AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw`

  useEffect(() => {
    fetch(proxyurl + API_HOSPITAL)
      .then(resolve => resolve.json())
      .then(data => {
        console.log(data)
        setState({
          loading: false,
          data: data
        })
        return data
      })
  }, [])

  const handleTakePhotoAnimationDone = dataUrl => {
    console.log('take photo')
    setDataUrl(dataUrl)
  }

  const isFullscreen = false

  const handleClick = e => {
    e.preventDefault()
    setDataUrl(null)
  }

  return (
    <div className='map-container'>
      <div className='map__container'>
        <Map className='map' center={state.currentLocation} zoom={state.zoom}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">JuanGonzalez</a> contributors'
          />
          <Marker
            position={{
              lat: location.state.latitude,
              lng: location.state.longitude
            }}
            icon={IconLocation}
          >
            <Popup className='coords'>
              <div>
                {dataUrl ? (
                  <>
                    <ImagePreview
                      className='coords__photo'
                      dataUrl={dataUrl}
                      isFullscreen={isFullscreen}
                    />
                    <a className='coords__exit' onClick={handleClick}>
                      x
                    </a>
                  </>
                ) : (
                  <Camera
                    className='coords__photo'
                    idealResolution={{ width: 480, height: 342 }}
                    onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                    isFullscreen={isFullscreen}
                  />
                )}
              </div>
            </Popup>
          </Marker>
          <MarkersUsers data={state.data} />
        </Map>
      </div>
    </div>
  )
}

export default MapUsers
