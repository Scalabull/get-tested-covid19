import React from 'react';
import DocumentMeta from 'react-document-meta';
import NavHeader from '../../components/shared/NavHeader.js';
import NavFooter from '../../components/shared/NavFooter.js';
import { ResourcesWrapper, QAWrapper, CDCWrapper } from './sharedStyles'
import { displayHeading } from './DisplayHeading'
import { displayCDCNotice } from './DisplayCDCNotice'
import { displayBeforeTesting } from './DisplayBeforeTesting'
import { displayTestingCenters } from './DisplayTestingCenters'
import { displayHowTestingWorks } from './DisplayHowTestingWorks'
import { displayAfterTesting } from './DisplayAfterTesting'
import { displayWhyIsTestingImportant } from './DisplayWhyIsTestingImportant'
import { DisplayResources } from './DisplayResources'
import { HowTestingWorksWrapper } from './sharedStyles'

class HowItWorks extends React.Component {
  render() {
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
        <HowTestingWorksWrapper>
          <NavHeader />
          <section className="section mt-4 mb-4">
            <div className="container">
              {displayHeading()}
            </div>
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
          <NavFooter />
        </HowTestingWorksWrapper>
      </DocumentMeta >
    );
  };
}


export default HowItWorks
