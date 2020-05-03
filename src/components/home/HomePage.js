
import React from 'react';
import HomeHero from './HomeHero.js';
import NavHeader from '../shared/NavHeader.js';

class HomePage extends React.Component {
    render() {
        return (
          <>
            <NavHeader />
            <HomeHero />
          </>
        );
    }
}

export default HomePage;
