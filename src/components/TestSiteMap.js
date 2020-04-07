import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class TestSiteMap extends React.Component {

  render() {
    const { items } = this.props;
    // TODO: For now we center the map with the coord of the first item
    // in the list. What we should really do is to center with the zipcode.
    // This requires Geocoding. We can do this either by using an API like
    // googlemap or serve a JSON file with all zipcode and coord as key
    // value pair. 
    return (
      <Map center={items[0]} zoom={6} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {items.map(item => (
          <Marker position={{lat: item.lat, lng: item.lng}}>
            <Popup>
              <h6>{item.name}</h6>
              <div>{item.address}, {item.city}, {item.state}</div>
            </Popup>
          </Marker>
        ))}
      </Map>
    )
  }
}
