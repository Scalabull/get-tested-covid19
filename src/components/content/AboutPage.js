
import React from 'react';
import NavHeader from '../shared/NavHeader.js';
import DocumentMeta from 'react-document-meta';
import NavFooter from '../shared/NavFooter.js';

class AboutPage extends React.Component {
  render() {
    const meta = {
      title: 'About | Get Tested COVID-19',
      description: 'Get tested COVID-19 is community led. We\'re working to make it easy for anyone in the US to find a nearby testing site.',
      meta: {
        charset: 'utf-8',
        name: {
            keywords: 'COVID-19, testing centers, novel coronavirus',
        },
      },
    };

    return (
      <DocumentMeta {...meta}>
        <NavHeader />
        <div className="container">
          <div class="jumbotron">
            <h1 class="display-4">Our Mission</h1>
            <p class="lead">As COVID-19 spreads through the United States, the CDC expects that much of the population will be exposed to the virus. Widespread testing is one of the key measures that will help the US (and the world) contain COVID-19, but community awareness of public testing centers has lagged behind demand. So we created a database to address that need.</p>
          </div>
        </div>
        <NavFooter />
      </DocumentMeta>
    );
  }
}

export default AboutPage;
