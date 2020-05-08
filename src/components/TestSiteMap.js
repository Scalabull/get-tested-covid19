import React, { Component, useState, useEffect } from "react";
import ReactMapboxGl, { Marker, Popup, Layer, Feature } from 'react-mapbox-gl';
import styled from 'styled-components';

const StyledMapPin = styled.div`
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background: red;
`

const MAX_GEO = 400;
const MIN_GEO = -400;
const MAP_MARKER_BUFFER = 0.001;
const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1Ijoic3VtYW5hZ3IxMyIsImEiOiJjazlsbHo2N3kwYmJvM2VuNXl3cTFoMHZvIn0.jfMLv49EhilU0_Xnp2gRKA'
});

export default class TestSiteMap extends React.Component {
    render() {
        // Mapbox uses [longitude, latitude] instead of [latitude, longitude]
        let { items, zipLatLng } = this.props;
        let mapCenter = null;
        let bounds = undefined;

        if(items && Array.isArray(items) && items.length > 0){
            mapCenter = [items[0].lng, items[0].lat];
            console.log(mapCenter);

            let maxLat = MIN_GEO;
            let maxLng = MIN_GEO;
            let minLng = MAX_GEO;
            let minLat = MAX_GEO;
            items.forEach(item => {
                if(item.lat > maxLat) maxLat = item.lat;
                if(item.lat < minLat) minLat = item.lat;
                if(item.lng > maxLng) maxLng = item.lng;
                if(item.lng < minLng) minLng = item.lng;
            });
            // minLat = minLat + MAP_MARKER_BUFFER;
            // maxLat = maxLat + MAP_MARKER_BUFFER;
            // minLng = minLng + MAP_MARKER_BUFFER;
            // maxLng = maxLng + MAP_MARKER_BUFFER;

            bounds = [[minLng, minLat], [maxLng, maxLat]];
        }

        if(zipLatLng && zipLatLng.latitude && zipLatLng.longitude) {
            mapCenter = [zipLatLng.longitude, zipLatLng.latitude];
        }

        console.log(bounds);
        
        return(
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                fitBounds={bounds}
                fitBoundsOptions={{ padding: 40 }}
                animationOptions={{ animate: false }}
                containerStyle={{ height: "100%" }}
                flyToOptions={{ maxDuration: 0.1}}
            >
                <Layer type="symbol" layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={mapCenter} />
                </Layer>
                {items.map((item, index) => (
                    <Marker coordinates={[item.lng, item.lat]} anchor="bottom">
                        <StyledMapPin />
                        {/* <Popup coordinates={[item.lng, item.lat]}>
                            <h6>{index + 1 + '. ' + item.name}</h6>
                            <p>{item.address}, {item.city}</p>
                        </Popup> */}
                    </Marker>
                ))}
            </Map>
        );
    }
}
