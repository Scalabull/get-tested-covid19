
import React from 'react';
import styled from 'styled-components'
import CardList from 'components/CardList';
import TestSiteMap from 'components/TestSiteMap';
import qs from 'query-string';
import HomeZipForm from 'components/Forms/HomeZipForm.js';
import axios from "axios";

import { Row, Col } from 'reactstrap';
import hero1 from '../assets/img/hero/Hero1.png';

import { GoogleApiWrapper } from 'google-maps-react';

// This function is for the "Use my location" feature. If Geolocation runs successfully and points to a US address, return lat, lng
/*
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
*/

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
            // isFetching: true,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = async (zipStr) => {
        const zipRE = /^[0-9]{5}$/;
        const zipMatchFlag = zipRE.test(zipStr); // returns true if zip code is valid 5 digit number
        if (isNumeric(zipStr) || zipStr === '') {
            if (zipMatchFlag) {
                const centersInRange = await axios.get(`/api/test-centers/${zipStr}`)
                this.setState({ items: centersInRange });
            }
        }
    }

    setDefaultZip(searchZip = this.state.defaultZip) {
        this.setState({ searchZip }, () => {
            this.filterList(this.state.searchZip || searchZip);
        });
    }

    /*
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
    */

    renderList() {

        //I don't think this is necessary anymore since we're not preloading the database as a large json obj
        /*
        if (this.state.isFetching) {
            return (
                <Col className='order-lg-1 text-center mb-9 mt-9 display-2' lg='12'>
                    <RotateAnimation>
                        <i className="fa fa-circle-o-notch" />
                    </RotateAnimation>
                </Col>
            );
        }
        */

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
                            {/* <div type="button" className='text-white mt-2' onClick={() => this.locateUser(true)}>
                                Use my current location
                            </div> */}
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
