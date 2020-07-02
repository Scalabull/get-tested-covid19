
import React from 'react';
import styled from 'styled-components'
import ResultsMap from './ResultsMap';
import axios from 'axios';
import qs from 'query-string';
import NavHeader from '../shared/NavHeader.js';
import ResultsListCards from './ResultsListCards';
import { Spinner, Button } from 'reactstrap';
import DocumentMeta from 'react-document-meta';
import ShareBtn from '../shared/ShareBtn.js';

const REACT_APP_GTC_API_URL = process.env.REACT_APP_GTC_API_URL;

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
    width: calc(100% - 550px);
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
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;

    max-width: 550px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 76px;
    left: 0;
    z-index: 10;

    h2 {
      font-family ${props => props.theme.fontSans};
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 0;
      margin-right: 1rem;
    }

    @media screen and (max-width: ${props => props.theme.bpSmall}) {
      top: 140px;

      h2 {
        font-size: 14px;
      }
    }
  }

  .results__list-note {
    padding: 15px 20px;
    font-size: 14px;
    background-color: ${props => props.theme.colorGrayLight};

    strong {
      font-weight: 600;
    }
  }

  .results__list-pagination {
    height: 60px;
    padding: 0 20px;
    border-top: 1px solid #eee;
    background-color: #fff;
    font-size: 14px;
    max-width: 550px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;

    .btn {
      padding: 0.25rem 0.7rem;
    }
  }

  .results__list-cards {
    margin-top: 59px;
    margin-bottom: 60px;
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

  .results__error {
    text-align: center;
    padding: 100px 15px;
  }
`

class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.resultsZip = [];
        this.zip = getQueryStringValue('zip');
        this.zipLatLng = null;
        this.state = {
          currentPage: 0,
          isFetching: true,
          hasError: null
        };
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
      if (this.zip) {
        this.filterList(this.zip);
      } else {
        // No zipcode to search
        this.setState({
          isFetching: false,
          hasError: 'NO_ZIP'
        });
      }
    }

    componentDidUpdate() {
      // When zip value changes, then update results
      if (getQueryStringValue('zip') !== this.zip) {
        this.zip = getQueryStringValue('zip');
        this.filterList(this.zip);

        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    filterList(searchZipStr,) {
        if (this.state.isFetching === false) {
          this.setState({
            isFetching: true
          });
        }

        const zipRE = /^[0-9]{5}$/;
        const zipMatchFlag = zipRE.test(searchZipStr);

        if (isNumeric(searchZipStr) && zipMatchFlag) {
          // Zip code is valid
          axios.get(REACT_APP_GTC_API_URL + '/api/v1/public/public-test-centers/zip/' + searchZipStr)
            .then(response => {
              //console.log('response is: ', response);
              this.zipLatLng = response.data.coords;
              this.resultsZip = response.data.testCenters;
              this.setState({
                isFetching: false,
                currentPage: 0
              })
            })
            .catch(err => {
              //console.log(err);
              this.resultsZip = [];
              this.setState({
                isFetching: false,
                currentPage: 0
              })
            });
        } else {
          this.setState({
            isFetching: false,
            hasError: 'INVALID_ZIP',
            currentPage: 0
          })
        }
    }

    handleNextPage = () => {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }), () => window.scrollTo({ top: 0 }));
    }

    handlePrevPage = () => {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1
      }), () => window.scrollTo({ top: 0 }));
    }

    render() {
      const meta = {
        title: `COVID-19 test centers near ${this.zip} | Get Tested COVID-19`,
        description: 'Find the closest COVID-19 test center. Make sure to check requirements and double check that your symptoms match those listed by the CDC.',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: 'COVID-19, testing centers, novel coronavirus'
          }
        }
      };

      // Only show results for current page
      const viewItems = this.resultsZip.slice(0 + this.state.currentPage*10, 10 + this.state.currentPage*10);

      return (
          <DocumentMeta {...meta}>
            <NavHeader wide />
            <StyledResultsPage>
              {this.state.isFetching && (
                <div className="results__loading">
                  <Spinner color="primary" />
                </div>
              )}
              {!this.state.isFetching && (
                <>
                  {this.state.hasError && this.state.hasError === 'NO_ZIP' && (
                    <div className="container results__error">
                      <h1>No zip code provided</h1>
                      <p>Please provide a valid US zip code to see test centers.</p>
                    </div>
                  )}
                  {this.state.hasError && this.state.hasError === 'INVALID_ZIP' && (
                    <div className="container results__error">
                      <h1>Invalid zip code</h1>
                      <p>Please provide a valid US zip code to see test centers.</p>
                    </div>
                  )}
                  {!this.state.hasError && this.resultsZip.length === 0 && (
                    <>
                      <div className="container results__error">
                        <h1>No test centers for this zip code</h1>
                        <p>Please try another zip code.</p>
                      </div>
                    </>
                  )}
                  {!this.state.hasError && this.resultsZip.length > 0 && (
                    <>
                      <div className="results__list">
                        <div className="results__list-header">
                          <h2>{this.resultsZip.length} result{this.resultsZip.length !== 1 ? 's' : ''} within 40 miles of {this.zip}</h2>
                          <ShareBtn />
                        </div>
                        <div className="results__list-cards">
                          {this.state.currentPage === 0 && (
                            <div className="results__list-note">
                              Test centers are for <strong>viral tests only</strong>. While some test centers may have antibody tests, they are not accurate enough yet to be recommended.
                            </div>
                          )}
                          <ResultsListCards items={viewItems} page={this.state.currentPage} />
                        </div>
                        <div className="results__list-pagination d-flex align-items-center justify-content-between">
                          <div className="pagination-current">Showing results {1 + this.state.currentPage*10} - {this.state.currentPage === Math.floor(this.resultsZip.length/10) ? this.resultsZip.length : 10 + this.state.currentPage*10}</div>
                          <div>
                            <Button id="tooltip-share" className="mr-2" color="primary" outline disabled={this.state.currentPage === 0} onClick={this.handlePrevPage}><i className="fas fa-arrow-left" /></Button>
                            <Button id="tooltip-share" color="primary" outline disabled={this.state.currentPage === Math.floor(this.resultsZip.length/10)} onClick={this.handleNextPage}><i className="fas fa-arrow-right" /></Button>
                          </div>
                        </div>
                      </div>
                      <div className="results__map">
                        <ResultsMap
                          items={viewItems}
                          page={this.state.currentPage}
                          totalCount={this.resultsZip.length}
                          zipLatLng={this.zipLatLng}
                          searchZip={this.zip}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </StyledResultsPage>
          </DocumentMeta>
      )
    }
}

export default ResultsPage;

const getQueryStringValue = (key, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    return values[key];
};

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}
