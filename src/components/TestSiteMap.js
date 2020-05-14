import React from "react";
import ReactMapboxGl, { Marker, Layer, Feature } from 'react-mapbox-gl';
import styled from 'styled-components';

const StyledMapPin = styled.div`
    border-radius: 50%;
    border: 16px solid ${props => props.theme.colorPurple};
    width: 16px;
    height: 16px;
    position: relative;
    top: -10px;

    &:after {
        content: '${props => props.num}';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        font-weight: 600;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: ${props => props.theme.fontSans};
    }

    &:before {
        position: absolute;
        content: '';
        width: 0px;
        height: 0px;
        bottom: -35px;
        left: -10px;
        border: 10px solid transparent;
        border-top: 17px solid ${props => props.theme.colorPurple};
    }
`

const MAX_GEO = 400;
const MIN_GEO = -400;
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
            mapCenter = [items[0].longitude, items[0].latitude];

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

            bounds = [[parseFloat(minLng), parseFloat(minLat)], [parseFloat(maxLng), parseFloat(maxLat)]];
        }

        if(zipLatLng && zipLatLng.latitude && zipLatLng.longitude) {
            mapCenter = [parseFloat(zipLatLng.longitude), parseFloat(zipLatLng.latitude)];
        }

        return(
            <Map
                // eslint-disable-next-line react/style-prop-object
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
                    <Marker key={`map-market-${index}`} coordinates={[parseFloat(item.longitude), parseFloat(item.latitude)]} anchor="top">
                        <StyledMapPin num={index + 1} />
                    </Marker>
                ))}
            </Map>
        );
    }
}
