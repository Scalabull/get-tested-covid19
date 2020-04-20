import React from 'react';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

export default class TestSiteMap extends React.Component {
    render() {
        let { items, zipLatLng } = this.props;
        let mapCenterCoords = items[0];

        items = items.map((item) => {
            item.shortName = item.name.substring(0, 12);
            if (item.name && item.name.length > 12) item.shortName += '...';
            return item;
        });

        if (zipLatLng && Array.isArray(zipLatLng)) {
            mapCenterCoords = zipLatLng;
        }
        return (
            <Map
                center={mapCenterCoords}
                zoom={10}
                zoomControl={true}
                dragging={true}
                className='map'
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {items.map((item, index) => (
                    <Marker position={{ lat: item.lat, lng: item.lng }}>
                        <Tooltip permanent={true}>
                            <h6>{index + 1 + '. ' + item.shortName}</h6>
                        </Tooltip>
                        <Popup>
                            <h6>{index + 1 + '. ' + item.name}</h6>
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
