import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export const displayHeading = () => (
  <Container className="py-lg-md d-flex">
    <div className="col px-0">
      <Row>
        <Col lg="8">
          <h1 className="display-3 text-white mt-3">
            How Does COVID-19 Testing Work?
          </h1>
        </Col>
        <Col lg="8">
          <p className="text-white">
            In the United States, the availability of COVID-19 testing varies.
            The number of sites differs by state, and the process can be
            different for individual sites. On this page, we’ll be sharing the
            basic information you need to know about how COVID-19 testing works.
          </p>
        </Col>
      </Row>
    </div>
  </Container>
);
