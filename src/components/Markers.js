import React, { useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation } from './IconLocation'

import numeral from 'numeral'
import '../assets/styles/components/Markers.css'

const Markers = props => {
  const { data, todayCases } = props
  console.log(todayCases)

  const markers = data.map(country => {
    return (
      <Marker
        key={country.country}
        position={{
          lat: country.countryInfo.lat,
          lng: country.countryInfo.long
        }}
        icon={IconLocation}
      >
        <Popup className='country'>
          <div className='info-container'>
            <div
              className='info-flag'
              style={{
                backgroundImage: `url(${country.countryInfo.flag})`
              }}
            />
            ;
            <div className='info-data'>
              <div className='info-name'>{country.country}</div>
              <div className='info-confirmed'>
                Casos: {numeral(country.cases).format('0,0')}
              </div>
              <div className='info-active'>
                Activos: {numeral(country.active).format('0,0')}
              </div>
              <div className='info-recovered'>
                Recuperados: {numeral(country.recovered).format('0,0')}
              </div>
              <div className='info-deceases'>
                Muertos: {numeral(country.deaths).format('0,0')}
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    )
  })

  return markers
}

export default Markers
