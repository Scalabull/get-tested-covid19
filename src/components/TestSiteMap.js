import React from 'react';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

const MAX_GEO = 400;
const MIN_GEO = -400;
const MAP_MARKER_BUFFER = 0.001;

export default class TestSiteMap extends React.Component {
    render() {
        let { items, zipLatLng } = this.props;
        let latLng = null;
        if(zipLatLng && zipLatLng.latitude && zipLatLng.longitude){
            latLng = [zipLatLng.latitude, zipLatLng.longitude];
        }

        items = items.map((item) => {
            item.shortName = item.name.substring(0, 12);
            if (item.name && item.name.length > 12) item.shortName += '...';

            item.latitude = parseFloat(item.latitude);
            item.longitude = parseFloat(item.longitude);

            return item;
        });

        let mapCenterCoords = null;
        let bounds = undefined;


        if(items && Array.isArray(items) && items.length > 0){
            mapCenterCoords = items[0];

            let maxLat = MIN_GEO;
            let maxLng = MIN_GEO;
            let minLng = MAX_GEO;
            let minLat = MAX_GEO;
            items.forEach(item => {
                if(item.latitude > maxLat) maxLat = item.latitude;
                if(item.latitude < minLat) minLat = item.latitude;
                if(item.longitude > maxLng) maxLng = item.longitude;
                if(item.longitude < minLng) minLng = item.longitude;
            });
            minLat = minLat + MAP_MARKER_BUFFER;
            maxLat = maxLat + MAP_MARKER_BUFFER;
            minLng = minLng + MAP_MARKER_BUFFER;
            maxLng = maxLng + MAP_MARKER_BUFFER;

            bounds = [[maxLat, minLng], [minLat, maxLng]];
        }

        if (latLng && Array.isArray(latLng)) {
            mapCenterCoords = latLng;
        }
        return (
            <Map
                center={mapCenterCoords}
                zoom={10}
                zoomControl={true}
                dragging={true}
                bounds={bounds}
                className='map'
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {items.map((item, index) => (
                    <Marker key={index} position={{ lat: item.latitude, lng: item.longitude }}>
                        <Tooltip permanent={true}>
                            <h6>{index + 1 }</h6>
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
