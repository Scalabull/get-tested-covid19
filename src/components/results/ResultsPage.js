
import React from 'react';
import styled from 'styled-components'
import CardList from 'components/CardList';
import TestSiteMap from 'components/TestSiteMap';
import haversine from 'haversine';
import qs from 'query-string';
import Vector from '../../assets/img/icons/map/Vector.png'
import { Row, Col } from 'reactstrap';
import { ShareButton } from '../../views/HowTestWorks/sharedStyles'
import { GoogleApiWrapper } from 'google-maps-react';
import NavHeader from '../shared/NavHeader.js';
import ResultsListCards from './ResultsListCards';

// DISTANCE THRESHOLD FOR SEARCH RESULTS (in Miles, Haversine distance)
const DISTANCE_THRESH = 40;

const StyledResultsPage = styled.div`
  display: flex;

  .results__list {
    max-width: 550px;
    width: 100%;

    @media screen and (max-width: ${props => props.theme.bpSmall}) {
      max-width: none;
    }
  }

  .results__map {
    width: 100%;
    position: fixed;
    top: 70px;
    bottom: 0;
    right: 0;
    left: 550px;

    .map {
      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: ${props => props.theme.bpSmall}) {
      display: none;
    }
  }

  .results__list-header {
    padding: 15px;

    h2 {
      font-family ${props => props.theme.fontSans};
      font-size: 16px;
      font-weight: 600;
    }
  }
`

class ResultsPage extends React.Component {
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
                    if (!err) {
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
                            // if (status && status.state === 'granted') {
                            //     this.locateUser();
                            // } else {
                                this.setDefaultZip();
                            //}
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

    render() {
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
              <NavHeader />
              <StyledResultsPage>
                <div className="results__list">
                  <div className="results__list-header">
                    <h2>{this.state.items.length} test centers within 40 miles of "{this.state.searchZip}"</h2>
                    {/* <ShareButton onClick={() => copyUrl(this.state.searchZip)}>Share results <img src={Vector} alt='Vector' />
                        <span id='popup'>Search results have been copied to clipboard</span>
                    </ShareButton> */}
                  </div>
                  <div className="results__list-cards">
                    <ResultsListCards items={viewItems} />
                  </div>
                </div>
                <div className="results__map">
                  <TestSiteMap
                      items={viewItems}
                      totalCount={this.state.items.length}
                      zipLatLng={this.state.zipLatLng}
                      searchZip={this.state.searchZip}
                  />
                </div>
              </StyledResultsPage>
            </>
        )
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
})(ResultsPage);

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

function codeAddress(zip, geocoder, callback) {
    geocoder.geocode({ 'address': zip }, function (results, status) {
        if (status === 'OK') {
            callback(null, results[0].geometry.location);
        }
        else {
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
