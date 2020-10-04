import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation } from './IconUsa'
import numeral from 'numeral'

const MarkersUsa = props => {
  const { data } = props
  const markersUsa = data.map((country, id) => {
    let date = country.updatedAt
    let lat = null
    let lng = null

    if (country.country !== 'US') {
      lat = country.coordinates.latitude
      lng = country.coordinates.longitude
      return lat, lng
    }
    return (
      <Marker
        key={id}
        position={{
          lat: country.coordinates.latitude,
          lng: country.coordinates.longitude
        }}
        icon={IconLocation}
      >
        <Popup className='country'>
          <div className='info-container'>
            <div className='info-data'>
              <div className='info-name'>{country.province}</div>
              <div className='info-active'>
                Activos: {numeral(country.stats.confirmed).format('0,0')}
              </div>
              <div className='info-recovered'>
                Recuperados: {numeral(country.stats.recovered).format('0,0')}
              </div>
              <div className='info-deceases'>
                Muertos: {numeral(country.stats.deaths).format('0,0')}
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    )
  })
  return markersUsa
}

export default MarkersUsa
