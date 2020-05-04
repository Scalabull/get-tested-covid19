
import React from 'react';
import HomeHero from './HomeHero.js';
import NavHeader from '../shared/NavHeader.js';
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
        <NavHeader minimal />
        <HomeHero />
      </DocumentMeta>
    );
  }
}

export default HomePage;
