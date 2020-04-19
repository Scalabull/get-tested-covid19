import React from 'react';
import { ResourcesListItem, ResourceInput, Content, ResourceTitle } from '../sharedStyles'

export const displaySubHeadingSections = (sections) => {
  return sections.map((section) => {
    const { title, content } = section;
    return (
      <ResourcesListItem>
        <ResourceTitle>{title}</ResourceTitle>    <ResourceInput type="checkbox" />
        <Content align='left'>{content}</Content>    </ResourcesListItem>
    );
  });
};
