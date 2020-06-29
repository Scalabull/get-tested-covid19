import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { GoogleApiWrapper } from 'google-maps-react';
import qs from 'query-string';
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    UncontrolledTooltip,
    Spinner
} from 'reactstrap';
import styled from 'styled-components';

const StyledZipForm = styled.div`
  .zip__submit {
    background-color: ${props => props.theme.colorPurpleDarker};
  }

  .form-control.border-0 {
    border-color: #fff;

    &:focus {
      border-color: #fff;
      outline: none;
    }
  }

  .btn-primary {
    border-color: ${props => props.theme.colorPurpleDarker};
  }

  .zip__loc {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-outline-secondary {
    border-color: #fff;
    background-color: #fff;
    position: relative;

    &:hover {
      color: #000;
    }

    .fas {
      font-size: 1.2rem;
      padding: 0 5px;
      color: ${props => props.theme.colorPurpleDarker};
    }

    &:after {
      content: '';
      position: absolute;
      background-color: #AAA;
      width: 1px;
      right: 0;
      top: 10px;
      bottom: 10px;
    }
  }
`

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

            //console.log('location found: ', pos);
            geocoder.geocode({ 'location': pos }, (res, status) => {
                if (status === 'OK') {
                    const isUSLoc = isUSLocation(res[0]);
                    const postalCode = returnPostalCode(res[0]);
                    if (res[0] && isUSLoc && postalCode !== null) {
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
        this.state = { 
          value: getQueryStringValue('zip') || '',
          gettingLoc: false
        };
    }
    
    handleChange = e => {
        let updateVal = e.target.value;
        if (updateVal === '' || isNumeric(updateVal)) {
            this.setState({ value: updateVal });
        }
    }

    handleSubmit = e => {
        e.preventDefault();

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

    locateUser = () => {
      this.setState({
        gettingLoc: true
      });
      
      let geocoder = new this.props.google.maps.Geocoder();
        
      tryGeolocation(geocoder, (err, pos, postalCode) => {
        if (err) {
          this.setState({
            gettingLoc: false
          });
        } else {
          this.props.history.push(`/search?zip=${postalCode}`);
        }
      });
    }

    render() {
      const { showLocate, large } = this.props;
        return (
          <StyledZipForm>
            <Form onSubmit={this.handleSubmit} inline>
                <FormGroup
                    className={classnames({
                        focused: this.state.searchFocused
                    })}
                >
                    <InputGroup disabled>
                      {showLocate && (
                        <InputGroupAddon addonType="prepend">
                          <Button className="zip__loc" id="LocateTooltip" outline onClick={this.locateUser}>
                            {!this.state.gettingLoc && <i className="fas fa-location-arrow" />}
                            {this.state.gettingLoc && <Spinner size="sm" color="secondary" />}
                          </Button>
                          <UncontrolledTooltip placement="top" target="LocateTooltip" offset={5}>
                            Find current location
                          </UncontrolledTooltip>
                        </InputGroupAddon>
                      )}
                      <Input
                        className={`search-input form-control ${large ? 'form-control-lg' : ''} ${showLocate ? 'border-0' : ''}`}
                        title='Enter zip code'
                        placeholder='Enter zip code'
                        type='text'
                        maxLength='5'
                        autoFocus={this.props.autoFocus}
                        onFocus={(e) =>
                            this.setState({ searchFocused: true })
                        }
                        onBlur={(e) =>
                            this.setState({ searchFocused: false })
                        }
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                      <InputGroupAddon addonType="append">
                        <Button className="zip__submit" type='submit' color="primary">
                          <i className="fas fa-search" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
          </ StyledZipForm>
        );
    }
}

export default withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyCj5wGAsi1ppD8qf6Yi-e6fMChdck7BMVg'
})(ZipForm));

const getQueryStringValue = (key, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    return values[key];
};