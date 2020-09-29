// import React from 'react'
// import { Map, TileLayer, Marker } from 'react-leaflet'

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng
// } from 'use-places-autocomplete'

// const MapPlaces = () => {
//   return (
//     <div>
//       <h1>
//         Bears{' '}
//         <span role='img' aria-label='tent'>
//           ⛺️
//         </span>
//       </h1>

//       <Map center={state.currentLocation} zoom={state.zoom}>
//         <TileLayer
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Markers data={state.data} />
//         {false ? (
//           <Marker
//             position={{ lat: location.state.lat, lng: location.state.lng }}
//             icon={IconLocation}
//           />
//         ) : (
//           <Marker position={{ lat: 0, lng: 0 }} icon={IconLocation} />
//         )}
//       </Map>
//     </div>
//   )
// }
// export default MapPlaces
