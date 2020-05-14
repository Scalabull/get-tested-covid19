import React from 'react';
import { displaySubHeadingSections } from '../DisplaySubHeadingSections'
import { ResourcesWrapper, ResourceSection } from '../sharedStyles'
export const displaySubHeading = ({ title, sections }) => {
  return (
    <ResourcesWrapper>
      <ResourceSection>
        <h1 className="display-5 mt-3 mb-3">{title}</h1>
        {displaySubHeadingSections(sections)}
      </ResourceSection>
    </ResourcesWrapper>
  );
};
