
import React from 'react';
import styled from 'styled-components'
import CardList from 'components/CardList';
import TestSiteMap from 'components/TestSiteMap';
import haversine from 'haversine';
import qs from 'query-string';
import HomeZipForm from 'components/Forms/HomeZipForm.js';

import { Row, Col } from 'reactstrap';
import hero1 from '../assets/img/hero/Hero1.png';

import { GoogleApiWrapper } from 'google-maps-react';

// DISTANCE THRESHOLD FOR SEARCH RESULTS (in Miles, Haversine distance)
const DISTANCE_THRESH = 40;

// Check if GeocoderResult object return form Google Geolocation is a US address.
function isUSLocation(geocoderResult){
    let filtered = geocoderResult.address_components.filter((component) => {
        return component.types &&
           component.types.includes("country") &&
           component.short_name === "US";
    });

    return filtered.length > 0;
}

function returnPostalCode(geocoderResult){
    let zipCode = null;

    geocoderResult.address_components.forEach(component => {
        if(component.types &&
            component.types.includes("postal_code") &&
            component.short_name.length === 5){

            zipCode = component.short_name;
        }
    });

    return zipCode;
}

// If Geolocation runs successfully and points to a US address, return lat, lng
function tryGeolocation(geocoder, callback){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          console.log('location found: ', pos);
          geocoder.geocode({'location': pos}, (res, status) => {
            if (status === 'OK') {
                const isUSLoc = isUSLocation(res[0]);
                const postalCode = returnPostalCode(res[0]);
                if (res[0] && isUSLoc && postalCode !== null) {
                    console.log('gelocation: ', res[0]);
                    console.log('postalCode: ', postalCode)
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

function codeAddress(zip, geocoder, callback) {
    geocoder.geocode( { 'address': zip}, function(results, status) {
        if (status === 'OK') {
            callback(null, results[0].geometry.location);
        }
        else{
            callback(status, null);
        }
    });
}

const getQueryStringValue = (key, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    return values[key];
};

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

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
        this.filterList(zipStr + "");
    }

    filterList(searchZipStr) {
        const zipRE = /^[0-9]{5}$/;
        const zipMatchFlag = zipRE.test(searchZipStr);

        // Only allow numeric inputs.
        if (isNumeric(searchZipStr) || searchZipStr === '') {
            if (zipMatchFlag) {
                let updatedList = this.state.initialItems;

                let geocoder = new this.props.google.maps.Geocoder();
                codeAddress(searchZipStr, geocoder, (err, googleLatLng) => {
                    if(!err){
                        //Use haversine distance w/ lat, lng
                        const zipLatLng = {
                            latitude: googleLatLng.lat(),
                            longitude: googleLatLng.lng(),
                        };

                        updatedList = updatedList.map(function (item) {
                            // return any sites within 40 miles.
                            const end = {
                                latitude: item.lat,
                                longitude: item.lng,
                            };

                            const dist = haversine(zipLatLng, end, { unit: 'mile' });
                            let newItem = { ...item };
                            newItem.dist = dist;
                            return newItem;
                        });

                        updatedList = updatedList.filter((item) => {
                            return item.dist < DISTANCE_THRESH;
                        });

                        updatedList.sort((item1, item2) => {
                            return item1.dist - item2.dist;
                        });

                        this.setState({ items: updatedList, zipLatLng, searchZip: searchZipStr });
                    }
                });
            } else {
                this.setState({
                    items: [],
                });
            }
        }
    }

    componentDidMount() {
        fetch('https://storage.googleapis.com/covid19-resources/testSites.json')
            .then((res) => res.json())
            .then(
                (res) => {
                    this.setState({
                        initialItems: res.testSites,
                        items: res.testSites,
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
            .then(() => {
                this.setState({
                    isFetching: false,
                });

                // try to get previously approved location
                const zipQueryString = getQueryStringValue('zip');
                if (!zipQueryString && navigator && navigator.permissions) {
                    navigator.permissions.query({ name: 'geolocation' })
                        .then(status => {
                            if (status && status.state === 'granted') {
                                this.locateUser();
                            } else {
                                this.setDefaultZip();
                            }
                        })
                } else {
                    this.setDefaultZip();
                }
            })
    }

    setDefaultZip(searchZip = this.state.defaultZip) {
        this.setState({ searchZip }, () => {
            this.filterList(this.state.searchZip || searchZip);
        });
    }

    locateUser(scrollTo = false) {
        let geocoder = new this.props.google.maps.Geocoder();
        tryGeolocation(geocoder, (err, pos, postalCode) => {
            if(err){
                this.setDefaultZip();
            } else {
                this.setDefaultZip(postalCode);
                if (scrollTo && this.scrollRef) {
                    window.scroll( { left:0, top: this.scrollRef.current.offsetTop, behavior: 'smooth'})
                }
            }
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
                        <p>
                            {viewItems.length} of {this.state.items.length} results within 40 miles of "{this.state.searchZip}"
                        </p>
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
