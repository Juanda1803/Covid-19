import React from 'react'
import { Marker } from 'react-leaflet'
import { IconLocation } from './IconLocation'

const UserMakers = props => {
  const { userData } = props

  return (
    <Marker
      position={{
        lat: userData.state.lat,
        lng: userData.state.long
      }}
      icon={IconLocation}
    />
  )
}

export default UserMakers
