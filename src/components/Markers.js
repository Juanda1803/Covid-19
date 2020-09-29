import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation } from './IconLocation'

import '../assets/styles/components/Markers.css'

const Markers = props => {
  const { data } = props
  const markers = data.map((country, id) => {
    return (
      <Marker
        key={id}
        position={{
          lat: country.countryInfo.lat,
          lng: country.countryInfo.long
        }}
        icon={IconLocation}
      >
        <Popup className='country'>
          <h1>{country.country}</h1>
          <img className='country__image' src={country.countryInfo.flag} />
          <br />
          <strong>Infectados:</strong>
          {country.cases}
          <br />
          <strong>Muertos:</strong>
          {country.deaths}
          <br />
          <strong>Recuperados:</strong>
          {country.recovered}
          <br />
        </Popup>
      </Marker>
    )
  })

  return markers
}

export default Markers
