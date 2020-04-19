import React from 'react';
import { Row, Col } from 'reactstrap';
import { displaySubHeadingSections } from '../DisplaySubHeadingSections'
import { ResourcesWrapper, ResourceSection } from '../sharedStyles'
export const displaySubHeading = ({ title, sections }) => {
  return (
    <ResourcesWrapper>
      <ResourceSection>
        <h1 className="display-3 mt-3">{title}</h1>
        {displaySubHeadingSections(sections)}
      </ResourceSection>
    </ResourcesWrapper>
  );
};
