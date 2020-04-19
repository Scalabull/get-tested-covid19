import React from 'react';
import { Row, Col } from 'reactstrap';
import { displaySubHeadingSections } from '../DisplaySubHeadingSections'

export const displaySubHeading = ({ title, sections }) => {
  return (
    <Row>
      <Col lg="8">
        <h1 className="display-3 mt-3">{title}</h1>
        {displaySubHeadingSections(sections)}
      </Col>
    </Row>
  );
};
