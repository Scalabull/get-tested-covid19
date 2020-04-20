import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class TestSiteMap extends React.Component {
    render() {
        const { items, zipLatLng } = this.props;
        let mapCenterCoords = items[0];

        if(zipLatLng && Array.isArray(zipLatLng)){
            mapCenterCoords = zipLatLng;
        }
        return (
            <Map center={mapCenterCoords} zoom={10} zoomControl={false} dragging={false} className='map'>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {items.map((item, index) => (
                    <Marker position={{ lat: item.lat, lng: item.lng }} >
                        <Popup>
                            <h6>{index + 1 + ". " + item.name}</h6>
                            <div>
                                {item.address}, {item.city}, {item.state}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </Map>
        );
    }
}
