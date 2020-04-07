import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class SimpleExample extends Component {

  render() {
    const { items } = this.props;
    return (
      <Map center={items[0]} zoom={6} style={{height: '400px', width: '100%'}}>
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