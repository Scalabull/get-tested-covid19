
import React from 'react';
import styled from 'styled-components'
import CardList from 'components/CardList';
import TestSiteMap from 'components/TestSiteMap';
import qs from 'query-string';
import axios from 'axios';
import HomeZipForm from 'components/Forms/HomeZipForm.js';
import Vector from '../assets/img/icons/map/Vector.png'
import { Row, Col } from 'reactstrap';
import hero1 from '../assets/img/hero/Hero1.png';
import { ShareButton } from '../views/HowTestWorks/sharedStyles'
import { GoogleApiWrapper } from 'google-maps-react';

const REACT_APP_GTC_API_URL = process.env.REACT_APP_GTC_API_URL;

// Check if GeocoderResult object return form Google Geolocation is a US address.
function isUSLocation(geocoderResult) {
    let filtered = geocoderResult.address_components.filter((component) => {
        return component.types &&
            component.types.includes("country") &&
            component.short_name === "US";
    });

    return filtered.length > 0;
}
function copyUrl(zip) {
    const dummy = document.createElement('input'),
        text = `https://get-tested-covid19.org?zip=${zip}`;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy)
    document.getElementById('popup').style.visibility = 'visible'
    const strCmd = "document.getElementById('popup').style.visibility = 'hidden'";
    setTimeout(strCmd, 1500);
}

function returnPostalCode(geocoderResult) {
    let zipCode = null;

    geocoderResult.address_components.forEach(component => {
        if (component.types &&
            component.types.includes("postal_code") &&
            component.short_name.length === 5) {

            zipCode = component.short_name;
        }
    });

    return zipCode;
}

// If Geolocation runs successfully and points to a US address, return lat, lng
function tryGeolocation(geocoder, callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // console.log('location found: ', pos);
            // console.log('full position: ', JSON.stringify(position, null, '\t'));

            geocoder.geocode({ 'location': pos }, (res, status) => {
                if (status === 'OK') {
                    const isUSLoc = isUSLocation(res[0]);
                    const postalCode = returnPostalCode(res[0]);
                    if (res[0] && isUSLoc && postalCode !== null) {
                        // console.log('gelocation: ', res[0]);
                        // console.log('postalCode: ', postalCode)
                        callback(null, pos, postalCode);
                    } else {
                        callback(new Error('Geolocated address not in the US, or not valid postal code.'))
                    }
                } else {
                    callback(new Error('Error running geolocation.', status));
                }
            });
        }, () => {
            callback(new Error('Error loading geolocation.'));
        },
            {
                timeout: 5000, // wait 5s for the reply
            });
    } else {
        callback(new Error('Geolocation not supported.'));
    }
}

const getQueryStringValue = (key, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    return values[key];
};

class TestSiteList extends React.Component {
    constructor(props) {
        super(props);

        let zip = getQueryStringValue('zip') || '';
        this.scrollRef = React.createRef();

        this.state = {
            initialItems: [],
            items: [],
            searchZip: zip,
            defaultZip: zip || '10001',
            zipLatLng: null,
            isFetching: true,
        };

        this.filterList = this.filterList.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(zipStr) {
        this.setState({isFetching: true}, () => {
            this.filterList(zipStr + "");
        });
    }

    filterList(searchZipStr, latLngPos) {
        if(latLngPos && latLngPos.lat && latLngPos.lng){
            axios.get(REACT_APP_GTC_API_URL + '/api/v1/public/test-centers/searchByUserLatLng/?latitude=' + latLngPos.lat + '&longitude=' + latLngPos.lng)
                .then(response => {
                    // console.log('response is: ', JSON.stringify(response));
                    const coords = {latitude: latLngPos.lat, longitude: latLngPos.lng};
                    this.setState({items: response.data.testCenters, zipLatLng: coords, searchZip: searchZipStr, isFetching: false});
                })
                .catch(err => {
                    //console.log(err);
                    this.setState({items: [], searchZip: searchZipStr, isFetching: false});
                });
        } 
        else {

            const zipRE = /^[0-9]{5}$/;
            const zipMatchFlag = zipRE.test(searchZipStr);

            if (zipMatchFlag) {
                axios.get(REACT_APP_GTC_API_URL + '/api/v1/public/test-centers/zip/' + searchZipStr)
                .then(response => {
                    // console.log('response is: ', JSON.stringify(response));
                    this.setState({items: response.data.testCenters, zipLatLng: response.data.coords, searchZip: searchZipStr, isFetching: false});
                })
                .catch(err => {
                    //console.log(err);
                    this.setState({items: [], searchZip: searchZipStr, isFetching: false});
                });
            } else {
                this.setState({
                    items: [],
                    isFetching: false
                });
            }
        }   
    }

    componentDidMount() {
        this.setDefaultZip();
    }

    setDefaultZip(searchZip = this.state.defaultZip, latLng) {
        this.setState({ searchZip }, () => {
            this.filterList(this.state.searchZip || searchZip, latLng);
        });
    }

    locateUser(scrollTo = false) {
        this.setState({ isFetching: true}, () => {
            let geocoder = new this.props.google.maps.Geocoder();
            tryGeolocation(geocoder, (err, pos, postalCode) => {
                if (err) {
                    this.setDefaultZip();
                    if (scrollTo && this.scrollRef) {
                        window.scroll({ left: 0, top: this.scrollRef.current.offsetTop, behavior: 'smooth' })
                    }
                } else {
                    this.setDefaultZip(postalCode, pos);
                    if (scrollTo && this.scrollRef) {
                        window.scroll({ left: 0, top: this.scrollRef.current.offsetTop, behavior: 'smooth' })
                    }
                }
            });
        }); 
    }

    renderList() {
        if (this.state.isFetching) {
            return (
                <Col className='order-lg-1 text-center mb-9 mt-9 display-2' lg='12'>
                    <RotateAnimation>
                        <i className="fa fa-circle-o-notch" />
                    </RotateAnimation>
                </Col>
            );
        }

        const viewItems = this.state.items.slice(0, 10);

        return (
            <>
                <Col className='order-lg-1 pt-4' lg='7'>
                    <Row className='pl-4'>
                        <Col lg='9'>
                            <p>
                                {viewItems.length} of {this.state.items.length} results within 40 miles of "{this.state.searchZip}"
                            </p>
                        </Col>
                        <Col lg='3'>
                            <ShareButton onClick={() => copyUrl(this.state.searchZip)}>Share results <img src={Vector} alt='Vector' />
                                <span id='popup'>Search results have been copied to clipboard</span>
                            </ShareButton>
                        </Col>
                    </Row>
                    <CardList style={{ width: '100vw' }} items={viewItems} totalCount={this.state.items.length} />
                </Col>
                <Col className='order-lg-2' lg='5'>
                    <TestSiteMap
                        style={{ width: '100vw' }}
                        items={viewItems}
                        totalCount={this.state.items.length}
                        zipLatLng={this.state.zipLatLng}
                        searchZip={this.state.searchZip}
                    />
                </Col>
            </>
        )
    }

    render() {
        return (
            <div>
                <Row
                    className='row-grid align-items-start pt-6 pb-1
                            pl-6 pr-6 search-header'
                >
                    <Col className='order-lg-1' lg='7'>
                        <Row>
                            <h4 className='display-3 text-white'>Find a COVID-19 community-test center near you.</h4>
                        </Row>
                        <Row>
                            <p className='text-white'>
                                We have created a database of COVID-19 testing centers across the US. Please enter your zip code to find a location near you.
                            </p>
                        </Row>
                        <Row>
                            <HomeZipForm onSubmit={this.onSubmit} searchZip={this.state.searchZip}></HomeZipForm>
                        </Row>
                        <Row>
                            <div type="button" className='text-white mt-2' onClick={() => this.locateUser(true)}>
                                Use my current location
                            </div>
                        </Row>
                    </Col>
                    <Col className='order-lg-1 mt--100' lg='5'>
                        <img src={hero1} alt='lab testing'></img>
                    </Col>
                </Row>
                <section ref={this.scrollRef}>
                    <Row className='row-grid align-items-start card-list mt-4'>
                        {this.renderList()}
                    </Row>
                </section>
            </div>
        );
    }
}

export const RotateAnimation = styled.div`
-webkit-animation:spin 2s linear infinite;
-moz-animation:spin 2s linear infinite;
animation:spin 2s linear infinite;

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCj5wGAsi1ppD8qf6Yi-e6fMChdck7BMVg'
})(TestSiteList);
