

import React from 'react';
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

        this.state = {
            initialItems: [],
            items: [],
            searchZip: zip,
            zipLatLng: null
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
                this.filterList(this.state.searchZip || '10001');
                this.setState({searchZip: '10001'});
            });
    }

    render() {
        let viewItems = this.state.items.slice(0, 10);

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
                                We have created a database of community centers across the U.S. Please enter your
                                location zip code to find one near you
                            </p>
                        </Row>
                        <Row>
                            <HomeZipForm onSubmit={this.onSubmit}></HomeZipForm>
                        </Row>
                    </Col>
                    <Col className='order-lg-1 mt--100' lg='5'>
                        <img src={hero1} alt='lab testing'></img>
                    </Col>
                </Row>
                <Row className='row-grid align-items-start card-list mt-4'>
                    
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
                </Row>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCj5wGAsi1ppD8qf6Yi-e6fMChdck7BMVg'
  })(TestSiteList);
