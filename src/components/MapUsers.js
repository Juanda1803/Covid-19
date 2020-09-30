import React from 'react'
import { GoogleApiWrapper } from 'google-maps-react'

const API = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=4.5867052,-74.1957362&radius=10500&type=hospital&keyword=hospital&key=AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw`

class MapUsers extends React.Component {
  constructor (props) {
    super(props)
    this.google = props.google
    this.state = {
      data: {}
    }
  }

  componentDidMount () {
    this.getData()
  }
  getData = async () => {
    const resolve = await fetch(API)
    const data = resolve.json()
    this.setState({
      data: data
    })
    console.log(data)
  }
  render () {
    return (
      <div>Hola</div>
      // <Map
      //   google={this.google}
      //   style={{ height: '80vh', width: '80%' }}
      //   zomm={3}
      //   initialCenter={{ lat: 0, lng: 0 }}
      // >
      //   <Marker position={{ lat: 10, lng: -70 }} />
      // </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw'
})(MapUsers)
