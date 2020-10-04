import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation } from './IconHospital'
import { useLocation } from 'react-router-dom'

import '../assets/styles/components/Markers.css'

const Markers = props => {
  const location = useLocation()
  const latUser = location.state.latitude
  const lngUser = location.state.longitude
  const { data } = props
  const markers = data.results.map(coords => {
    let lat = coords.geometry.location.lat
    let lng = coords.geometry.location.lng
    const R = 6371
    const radians = value => {
      return (value * 3.14) / 180
    }
    let difLng = radians(lng - lngUser)
    let difLat = radians(lat - latUser)

    let a =
      Math.sin(difLat / 2) * Math.sin(difLat / 2) +
      Math.cos(radians(latUser)) *
        Math.cos(radians(lng)) *
        Math.sin(difLng / 2) *
        Math.sin(difLng / 2)

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let res = parseInt(R * c)

    return (
      <Marker
        key={coords.place_id}
        position={{
          lat: lat,
          lng: lng
        }}
        icon={IconLocation}
      >
        <Popup
          className='coords
        '
        >
          <div>
            <h3>{coords.name}</h3>
            <p>Distancia: {res} Km</p>
          </div>
        </Popup>
      </Marker>
    )
  })

  return markers
}

export default Markers
