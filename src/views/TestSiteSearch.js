
import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import TestSiteList from "components/TestSiteList.js";
import DocumentMeta from 'react-document-meta';
import footerHero from '../assets/img/hero/Email_illustration.png';

class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    const meta = {
      title: 'Search COVID-19 Test Center By Zipcode | Get Tested COVID-19',
      description: 'Find the closest COVID-19 Test Center. Make sure to check requirements and double check that your symptoms match those listed by the CDC.',
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
            <section className="section section-lg section-shaped pb-0 mr-0">
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
              <TestSiteList></TestSiteList>

               {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >

              </svg>
            </div>
            </section>
            {/* 1st Hero Variation */}
          </div>


          <section className="section section-lg pt-0 mt-0 pb-0 pt-0 footer-container">
            <Container>
            <Row className="align-items-center">
              <Col lg="7">
                <Row>
                <p>
                <span className="medWeight">
                  We are a team of volunteers working around-the-clock to provide accurate information.
                  If any data you see here is incorrect, please report the issue, and we will fix it.
                  Stay safe.
                </span>
                </p>
                </Row>
                <Row>
                  <Col lg="4">
                  <Button
                    block
                    className="btn-info"
                    color="default"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdr_SEZYn9s6SOahSEGMkrWn4_p-9sCJQf9HtWFyNR9mAPCow/viewform?usp=sf_link"
                    size="lg"
                    target="_blank"
                  >
                    Contact Us
                  </Button>
                  </Col>

                </Row>


              </Col>
              <Col className="ml-lg-auto" lg="4">
                <img src={footerHero} alt='lab testing'></img>
              </Col>
            </Row>
            </Container>
          </section>

        </main>
        <SimpleFooter />
      </DocumentMeta>
    );
  }
}

export default Landing;
