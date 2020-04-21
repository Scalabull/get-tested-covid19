import React from 'react';
import DocumentMeta from 'react-document-meta';
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import { ResourcesWrapper, QAWrapper, CDCWrapper } from './sharedStyles'
import { displayHeading } from './DisplayHeading'
import { displayCDCNotice } from './DisplayCDCNotice'
import { displayBeforeTesting } from './DisplayBeforeTesting'
import { displayTestingCenters } from './DisplayTestingCenters'
import { displayHowTestingWorks } from './DisplayHowTestingWorks'
import { displayAfterTesting } from './DisplayAfterTesting'
import { displayWhyIsTestingImportant } from './DisplayWhyIsTestingImportant'
import { DisplayResources } from './DisplayResources'


export default () => {
  const meta = {
    title: 'How Testing Works',
    description:
      'In the United States, the availability of COVID-19 testing varies. The number of sites differs by state, and the process can be different for individual sites. On this page, we’ll be sharing the basic information you need to know about how COVID-19 testing works.',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'COVID-19, testing centers, novel coronavirus',
      },
    },
  };
  return (
    <DocumentMeta {...meta}>
      <DemoNavbar />
      <section className="section section-lg section-shaped pb-100">
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

        {displayHeading()}
      </section>
      <ResourcesWrapper>
        <QAWrapper>
          {displayBeforeTesting()}
          {displayTestingCenters()}
          {displayHowTestingWorks()}
          {displayAfterTesting()}
        </QAWrapper>
        <CDCWrapper>
          {displayCDCNotice()}
        </CDCWrapper>
      </ResourcesWrapper>
      {displayWhyIsTestingImportant()}
      {DisplayResources()}
      <SimpleFooter />
    </DocumentMeta >
  );
};
