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

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import HomeZipForm from "components/Forms/HomeZipForm.js";

import DocumentMeta from 'react-document-meta';

class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    const meta = {
      title: 'Help Build A COVID-19 Test Center Database | Get Tested COVID-19',
      description: 'A community led effort to help people find the closest coronavirus testing center and provide accurate COVID-19 resources to every community',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'COVID-19, testing centers, novel coronavirus'
        }
      }
    };

    return (
      <DocumentMeta {...meta}>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped mb-4">
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
                      <h1 className="display-3 text-white mt-3">
                        Building a COVID-19 Test Center Database With Your Help
                      </h1>
                      
                      
                    </Col>
                    <Col lg="10">
                    <p className="text-white">
                        As COVID19 spreads rapidly through the USA, community testing centers are springing up across the nation. We want to help make it easy for people to find their closest testing center and provide accurate information to every community — especially as more tests become available in the coming days and weeks. In order for us to achieve this goal, we need your help.
                      </p>
                    </Col>
                    <HomeZipForm></HomeZipForm>
                    <Col lg="10">
                      <p className="text-white small">
                      *If you are sick or think you need to be tested now, please consult the <a className="text-success" href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" target="_blank" >CDC’s recommendations</a> and/or talk to your doctor.
                      </p>
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
          <section className="section section-lg pt-lg-0 ">
            <Container>
            <Row className="text-center justify-content-center mb-3">
                <Col lg="10">
                  <h2 className="display-3 ">Ways You Can Help</h2>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-fat-add" />
                          </div>
                          <h6 className="text-success text-uppercase">
                             CONTRIBUTE
                          </h6>
                          <p className="description mt-3">
                            Add missing community test centers to the list by submitting information for us to validate and add to our database.
                          </p>
                          
                          <Button
                            className="mt-4"
                            color="success"
                            href="https://forms.gle/tBj9HrHQHNFJf4Ju7"
                            target="_blank"
                          >
                            ADD CENTER
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-email-83" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            SUPPORT
                          </h6>
                          <p className="description mt-3">
                            Want to help amplify our efforts through promotion, partnerships, or donations? Reach out to see ways you can help us push forward.
                          </p>
                          
                          <Button
                            className="mt-4"
                            color="success"
                            href="https://forms.gle/XNLM61D17zY5Jusi6"
                            target="_blank"
                          >
                            SEND AN EMAIL
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-settings" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            BUILD
                          </h6>
                          <p className="description mt-3">
                            If you have information on setting up a test center or want to set one up in your community, please get in touch with us.
                          </p>
                          
                          <Button
                            className="mt-4"
                            color="success"
                            href="https://forms.gle/yWHUZPmMWjWJvLnv5"
                            target="_blank"
                          >
                            CONTACT US
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg bg-gradient-default mt-0 pt-5 pb-5">
            <Container className=" mt-0">
              <Row className="text-center justify-content-center mt-0">
                <Col lg="10" className="mt-0">
                  <h2 className="display-3 text-white pb-3">What are COVID-19 community testing centers?</h2>
                  <p className="text-white">
                    Testing centers aim to help the public access laboratory testing in a safe way while minimizing potential spread of the novel coronavirus COVID19. These sites are often built as pop-up tents or converted facilities, in an effort to take some of the burden off of hospitals and help enable local healthcare providers to continue to operate normally.
                  </p>
                </Col>
              </Row>
              <Row className="row-grid mt-5">
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-watch-time text-primary" />
                  </div>
                  <h5 className="mt-3 text-white">TIMES OF OPERATION</h5>
                  <p className="text-white mt-3">
                  Most testing sites open around 8 - 9 AM and close around 6 - 8 PM on weekdays, with limited hours on weekends depending on the state.
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-square-pin text-primary" />
                  </div>
                  <h5 className="mt-3 text-white">OPERATING PROCEDURES</h5>
                  <p className="text-white mt-3">
                  Most operate as walk up or drive-through facilities and only those who exhibit <a href="/resources" className="text-success">symptoms</a> will receive a test.
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-single-copy-04 text-primary" />
                  </div>
                  <h5 className="mt-3 text-white">PREREQUISITE INFORMATION</h5>
                  <p className="text-white mt-3">
                  Some testing sites may require appointments, doctor approval, or presence of certain symptoms before testing.
                  </p>
                </Col>
              </Row>
              <Row className="row-grid pt-0 mt-0">
                <Col lg="12" className="text-center">
                  
                  <small className="text-success mt-3 text-center">
                  *Note: this information is based on publicly availble resources and may not be reflected at every testing center as each is unique to the operating procedures defined by it’s maintainers.
                  </small>
                </Col>
                
              </Row>
            </Container>
          </section>
          
          <section className="section section-lg pt-100">
            <Container>
              <Card className="bg-gradient-warning shadow-lg border-0">
                <div className="p-5">
                  <Row className="align-items-center">
                    <Col lg="8">
                      <h3 className="text-white">
                        Please see the CDC's Guidance on getting tested for COVID-19
                      </h3>
                      <p className="lead text-white mt-3">
                        Please check your temperature, consult with your doctor if possible, and follow the CDC's guidelines.
                      </p>
                    </Col>
                    <Col className="ml-lg-auto" lg="3">
                      <Button
                        block
                        className="btn-white"
                        color="default"
                        href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
                        size="lg"
                      >
                        CDC Website
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </section>

        </main>
        <SimpleFooter />
      </DocumentMeta>
    );
  }
}

export default Landing;
