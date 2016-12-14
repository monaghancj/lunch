const React = require('react')

import {
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={1}
    defaultCenter={ { lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) =>
      <Marker {...marker} />
    )}
  </GoogleMap>
))

const Map = React.createClass({
  render() {
    return (
      <div>
        <h1>Maps Demo</h1>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{height: '400px'}}></div>
          }
          mapElement={
            <div style={{height: '400px'}}></div>
          }
          onMapLoad={() => null }
          onMapClick={() => null }
          markers={[{
            position: {
              lat: 25.0112183,
              lng: 121.52067570000001,
            },
            key: `Taiwan`,
            defaultAnimation: 2,
          }]}
          onMarkerRightClick={() => null }
          />
      </div>
    )
  }
})

module.exports = Map
