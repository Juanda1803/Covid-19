import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, TileLayer } from 'react-leaflet'

import Markers from './Markers'
import MarkersColombian from './MarkersColombian'
import MarkersUsa from './MarkersUsa'
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

  const [colombian, setColombian] = useState({
    loading: false,
    error: false,
    data: []
  })

  const [usa, setUsa] = useState({
    loading: false,
    error: false,
    data: []
  })

  const [coord, setCoord] = useState({
    latitude: 0,
    longitude: 0
  })

  const [todayCases, setTodayCases] = useState({})

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(resolve => resolve.json())
      .then(data => {
        setState({
          loading: false,
          data: data
        })
      })
  }, [])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/jhucsse')
      .then(resolve => resolve.json())
      .then(data => {
        setColombian({
          loading: false,
          data: data
        })
      })
  }, [])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/jhucsse')
      .then(resolve => resolve.json())
      .then(data => {
        setUsa({
          loading: false,
          data: data
        })
      })
  }, [])

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/countries`)
      .then(response => response.json())
      .then(data => {
        setTodayCases(data)
      })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoord({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        console.log(position)
      },
      error => {
        console.log(error)
      },
      {
        enableHighAccuracy: true
      }
    )
  }, [])

  return (
    <div className='map-container'>
      <div className='map__container'>
        <Map
          duration={0}
          className='map'
          center={state.currentLocation}
          zoom={state.zoom}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">JuanGonzalez</a> contributors'
          />
          <MarkersColombian data={colombian.data} />
          <MarkersUsa data={usa.data} />
          <Markers data={state.data} todayCases={todayCases} />
        </Map>
      </div>
      <Link
        className='map__container--link'
        to={{
          pathname: '/user',
          state: coord
        }}
      >
        Hospitales Cerca a mi Ubicacion
      </Link>
    </div>
  )
}

export default MapContainer
