
import React from 'react';
import HomeHero from './HomeHero.js';
import HomeAbout from './HomeAbout.js';
import HomeDonate from './HomeDonate.js';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';
import DocumentMeta from 'react-document-meta';

class HomePage extends React.Component {
  render() {
    const meta = {
      title: 'Search COVID-19 Test Centers By Zipcode | Get Tested COVID-19',
      description: 'Find the closest COVID-19 test center. Make sure to check requirements and double check that your symptoms match those listed by the CDC.',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'COVID-19, testing centers, novel coronavirus'
        }
      }
    };
    return (
      <DocumentMeta {...meta}>
        <NavHeader minimal hideZipForm />
        <HomeHero />
        <HomeDonate />
        <HomeAbout />
        <NavFooter />
      </DocumentMeta>
    );
  }
}

export default HomePage;
