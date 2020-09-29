import React, { useEffect, useState } from 'react'
import { Map, TileLayer } from 'react-leaflet'

import Markers from './Markers'
import 'leaflet/dist/leaflet.css'
import '../assets/styles/components/MapContainer.css'

const MapContainer = () => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    data: [],
    currentLocation: { lat: '0', lng: '0' },
    zoom: 3
  })

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
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

  return (
    <div>
      <Map
        style={{ height: '94vh', width: '100%' }}
        center={state.currentLocation}
        zoom={state.zoom}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">JuanGonzalez</a> contributors'
        />
        <Markers data={state.data} />
      </Map>
    </div>
  )
}

export default MapContainer
