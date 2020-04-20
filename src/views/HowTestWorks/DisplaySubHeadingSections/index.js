import React from 'react';
import { ResourcesListItem, ResourceInput, Content, ResourceTitle } from '../sharedStyles'

export const displaySubHeadingSections = (sections) => {
  return sections.map((section) => {
    const { title, content } = section;
    return (
      <ResourcesListItem>
        <ResourceInput type="checkbox" id={title} />
        <ResourceTitle for={title}>{title}</ResourceTitle>
        <Content align='left'>{content}</Content>    </ResourcesListItem>
    );
  });
};
