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
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Download from "./IndexSections/Download.js";

class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped ">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="12">
                      <h1 className="display-3 text-white">
                        Find your nearest COVID-19 Community Testing Site 
                      </h1>
                      <p className="lead text-white">
                        As COVID-19 spreads rapidly, community testing centers are springing-up across the nation. Our goal is to provide accurate information to every community and make it easy to find the testing station closest to you. We ask that you follow the CDC's recommendations for determining whether you should be tested. If you think you need to be tested, use our resources to find a community test center near you. 
                      </p>
                      <div className="btn-wrapper">
                        
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          href="/test-site-search"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-ambulance" />
                          </span>
                          <span className="btn-inner--text">
                            Search Test Sites
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <section className="section section-lg">
            <Container className="pb-100">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h2 className="display-3 ">What are COVID community testing sites?</h2>
                  <p className="lead text-muted">
                    The goal of these testing centers is to help the public get access to laboratory testing in a safe way that minimizes potential spread of the novel coronavirus. These test centers are often built as pop-up tents or converted facilities, to take some of the burden off of hospitals, and help enable local healthcare providers to continue to operate normally. 
                  </p>
                </Col>
              </Row>
              <Row className="row-grid mt-5">
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-watch-time text-primary" />
                  </div>
                  <h5 className="mt-3">Times of Operation</h5>
                  <p className="text-muted mt-3">
                  Most testing sites are open between 8 - 9 AM and close between 6-8PM on weeks days and limited hours on weekends depending on the state. 
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-square-pin text-primary" />
                  </div>
                  <h5 className="mt-3">Operating Procedure</h5>
                  <p className="text-muted mt-3">
                  Most operate as walk up or drive-through sites and only those who exhibit symptoms will recieve a test. 
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-single-copy-04 text-primary" />
                  </div>
                  <h5 className="mt-3">Prerequisite Information</h5>
                  <p className="text-muted mt-3">
                  Note some testing sites require appointments or doctor approval before they will accept you. 
                  </p>
                </Col>
              </Row>
            </Container>
          </section>

        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;
