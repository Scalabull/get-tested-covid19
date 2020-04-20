/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import debounce from 'lodash.debounce';
import CardList from 'components/CardList';
import TestSiteMap from 'components/TestSiteMap';
import haversine from 'haversine';
import qs from 'query-string';
import HomeZipForm from 'components/Forms/HomeZipForm.js';

// reactstrap components
import { Row, Col } from 'reactstrap';

// DISTANCE THRESHOLD FOR SEARCH RESULTS (in Miles, Haversine distance)
const DISTANCE_THRESH = 40;

// const setQueryStringWithoutPageReload = (qsValue) => {
//     const newurl =
//         window.location.protocol +
//         window.location.host +
//         window.location.pathname +
//         qsValue;

//     window.history.pushState({ path: newurl }, '', newurl);
// };

// const setQueryStringValue = (
//     key,
//     value,
//     queryString = window.location.search
// ) => {
//     const values = qs.parse(queryString);
//     const newQsValue = qs.stringify({ ...values, [key]: value });
//     setQueryStringWithoutPageReload(`?${newQsValue}`);
// };

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
            zipLookups: [],
            searchZip: zip,
            displayZip: ''
        };

        this.filterList = this.filterList.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.filterList(this.state.displayZip);
        this.setState({ searchZip: this.state.displayZip, displayZip: '' });
    }

    onChangeZip(e) {
        const zip = e.target.value;
        this.setState({ displayZip: zip });
    }

    filterList(searchZipStr) {
        // const searchZipStr = event.target.value;
        const zipRE = /^[0-9]{5}$/;
        const zipMatchFlag = zipRE.test(searchZipStr);

        //console.log('searching: ', searchZipStr)
        // Only allow numeric inputs.
        if (isNumeric(searchZipStr) || searchZipStr === '') {
            if (zipMatchFlag) {
                // Zip should be present in lookup table in 99% of cases.
                let zipLatLng = this.state.zipLookups[searchZipStr];
                let updatedList = this.state.initialItems;

                if (zipLatLng === undefined) {
                    // If no zip in lookup table, search by exact zip match (not lat, lng distance)
                    updatedList = updatedList.filter(function (item) {
                        return item.zip === searchZipStr;
                    });
                    this.setState({ items: updatedList});
                } else {
                    // else zip code is present in lookup table. Use haversine distance w/ lat, lng
                    const start = {
                        latitude: zipLatLng[0],
                        longitude: zipLatLng[1],
                    };

                    updatedList = updatedList.map(function (item) {
                        // return any sites within 40 miles.
                        const end = {
                            latitude: item.lat,
                            longitude: item.lng,
                        };

                        const dist = haversine(start, end, { unit: 'mile' });
                        // console.log('calculated distance: ', JSON.stringify(start), JSON.stringify(end), dist);

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

                    this.setState({ items: updatedList });
                }
            } else if (searchZipStr === '') {
                this.setState({
                    items: this.state.initialItems
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
                return fetch(
                    'https://storage.googleapis.com/covid19-resources/zipLookups.json'
                );
            })
            .then((res) => res.json())
            .then(
                (res) => {
                    this.setState({
                        zipLookups: res.zipLookups,
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
            .then(() => {
                this.filterList(this.state.searchZip || '10001');
            });
    }

    render() {
        let zipLatLng = null;
        if (this.state.searchZip) {
            zipLatLng = this.state.zipLookups[this.state.searchZip];
        }
        let viewItems = this.state.items.slice(0, 10);

        return (
            <div>
                <Row
                    className='row-grid align-items-start pt-6 pb-6
                            pl-6 pr-6 search-header'
                >
                    <Col className='order-lg-1' lg='7'>
                        <Row>
                            <h4 className='display-3 text-white'>
                                Find a COVID-19 community-test center near you.
                            </h4>
                        </Row>
                        <Row>
                            <p className='text-white'>
                                We have created a database of community centers
                                across the U.S. Please enter your location zip
                                code to find one near you
                            </p>
                        </Row>
                        <Row>
                            <Form onSubmit={this.onSubmit} inline>
                                <FormGroup>
                                    <Row form>
                                        <Input
                                            className='mr-0 pr-0'
                                            type='text'
                                            maxLength='5'
                                            title='Enter Zip Code (5 digit)'
                                            placeholder='Enter Zip Code (5 digit)'
                                            // className='form-control form-control-lg'
                                            onChange={(e) =>
                                                this.onChangeZip(e)
                                            }
                                            value={this.state.displayZip}
                                        />
                                        <Button type='submit' color='info'>
                                            Search
                                        </Button>
                                    </Row>
                                </FormGroup>
                            </Form>
                        </Row>
                    </Col>
                    <Col className='order-lg-1' lg='5'></Col>
                </Row>
                <Row className='row-grid align-items-start card-list'>
                    <Row className='pl-5 pr-5'>
                        <p>
                            Currently, there are over{' '}
                            {this.state.initialItems.length} community testing
                            centers across U.S.
                        </p>
                    </Row>
                    <Col className='order-lg-1' lg='7'>
                        <CardList
                            items={viewItems}
                            totalCount={this.state.items.length}
                        />
                    </Col>
                    <Col className='order-lg-1' lg='5'>
                        <TestSiteMap
                            items={viewItems}
                            totalCount={this.state.items.length}
                            zipLatLng
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TestSiteList;
