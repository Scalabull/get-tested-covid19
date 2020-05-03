import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { GoogleApiWrapper } from 'google-maps-react';

import {
    Button,
    Form,
    FormGroup,
    Input,
    Row,
} from 'reactstrap';

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

// If Geolocation runs successfully and points to a US address, return lat, lng
function tryGeolocation(geocoder, callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log('location found: ', pos);
            geocoder.geocode({ 'location': pos }, (res, status) => {
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

// Check if GeocoderResult object return form Google Geolocation is a US address.
function isUSLocation(geocoderResult) {
    let filtered = geocoderResult.address_components.filter((component) => {
        return component.types &&
            component.types.includes("country") &&
            component.short_name === "US";
    });

    return filtered.length > 0;
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

class ZipForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.searchZip || '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        let updateVal = event.target.value;
        if (updateVal === '' || isNumeric(updateVal)) {
            this.setState({ value: updateVal });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let submitVal = this.state.value;
        if (
            submitVal !== null &&
            submitVal !== undefined &&
            submitVal.length === 5 &&
            isNumeric(submitVal)
        ) {
            this.props.history.push(`/search?zip=${submitVal}`);
        }
    }

    locateUser(scrollTo = false) {
        let geocoder = new this.props.google.maps.Geocoder();
        
        tryGeolocation(geocoder, (err, pos, postalCode) => {
            if (err) {
                //this.setDefaultZip();
                // Add error state
            } else {
                this.props.history.push(`/search?zip=${postalCode}`);
            }
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} inline>
                <FormGroup
                    className={classnames({
                        focused: this.state.searchFocused
                    })}
                >
                    <Row form>
                        <Input
                            className='mr-0 pr-12 search-input form-control form-control-lg'
                            title='Enter zip code'
                            placeholder='Enter zip code'
                            type='text'
                            maxLength='5'
                            autoFocus
                            onFocus={(e) =>
                                this.setState({ searchFocused: true })
                            }
                            onBlur={(e) =>
                                this.setState({ searchFocused: false })
                            }
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <Button className='search-button' type='submit' color='info'>
                            Search
                        </Button>
                    </Row>
                </FormGroup>
                <div type="button" className='text-white mt-2' onClick={() => this.locateUser(true)}>
                    Use my current location
                </div>
            </Form>
        );
    }
}

export default withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyCj5wGAsi1ppD8qf6Yi-e6fMChdck7BMVg'
})(ZipForm));