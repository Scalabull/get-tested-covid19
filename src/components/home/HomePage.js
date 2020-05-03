
import React from 'react';
import HomeHero from './HomeHero.js';
import NavHeader from '../shared/NavHeader.js';

class HomePage extends React.Component {
    render() {
        return (
          <>
            <NavHeader hideSearch />
            <HomeHero />
          </>
        );
    }
}

export default HomePage;
