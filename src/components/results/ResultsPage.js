
import React from 'react';
import styled from 'styled-components'
import TestSiteMap from 'components/TestSiteMap';
import haversine from 'haversine';
import qs from 'query-string';
import { Col, Button, Tooltip } from 'reactstrap';
import { GoogleApiWrapper } from 'google-maps-react';
import NavHeader from '../shared/NavHeader.js';
import ResultsListCards from './ResultsListCards';
import { Spinner } from 'reactstrap';
import DocumentMeta from 'react-document-meta';

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
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-family ${props => props.theme.fontSans};
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 0;
    }
  }

  .results__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        let zip = getQueryStringValue('zip') || '';
        this.state = {
            initialItems: [],
            items: [],
            searchZip: zip,
            defaultZip: zip || '10001',
            zipLatLng: null,
            isFetching: true,
            isShareTooltipOpen: false
        };
        this.filterList = this.filterList.bind(this);
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

    componentDidUpdate() {
      // When zip value changes, then update results
      if (getQueryStringValue('zip') !== this.state.searchZip) {
        // TODO: Update this so that whenever filterList is called, it also updates the zip code
        this.setState({
          searchZip: getQueryStringValue('zip')
        });
        this.filterList(getQueryStringValue('zip'));
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' })
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

    copyUrl = zip => {
        const dummyInput = document.createElement('input');
        const url = `https://gettestedcovid.org/search?zip=${zip}`;
        document.body.appendChild(dummyInput);
        dummyInput.value = url;
        dummyInput.select();
        document.execCommand('copy');
        document.body.removeChild(dummyInput);
        this.setState({
          isShareTooltipOpen: true
        }, () => {
          setTimeout(() => {
            this.setState({
              isShareTooltipOpen: false
            })
          }, 3000)
        })
    }

    render() {
      const meta = {
        title: `COVID-19 test centers near ${this.state.searchZip} | Get Tested COVID-19`,
        description: 'Find the closest COVID-19 test center. Make sure to check requirements and double check that your symptoms match those listed by the CDC.',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: 'COVID-19, testing centers, novel coronavirus'
          }
        }
      };

      const viewItems = this.state.items.slice(0, 10);

      return (
          <DocumentMeta {...meta}>
            <NavHeader />
            <StyledResultsPage>
              {this.state.isFetching && (
                <div className="results__loading">
                  <Spinner color="primary" />
                </div>
              )}
              {!this.state.isFetching && (
                <>
                  <div className="results__list">
                    <div className="results__list-header">
                      <h2>{this.state.items.length} test centers within 40 miles of {this.state.searchZip}</h2>
                      <Button id="tooltip-share" outline size="sm" onClick={() => this.copyUrl(this.state.searchZip)}>Share</Button>
                      <Tooltip
                        placement="top"
                        isOpen={this.state.isShareTooltipOpen}
                        target="tooltip-share"
                      >
                        Results URL copied to clipboard
                      </Tooltip>
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
                </>
              )}
            </StyledResultsPage>
          </DocumentMeta>
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
