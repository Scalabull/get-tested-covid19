
import React from 'react';
import styled from 'styled-components'
import ZipForm from 'components/shared/ZipForm.js';

const StyledHomeHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 500px;

  h1 {
      margin-bottom: 30px;
  }

`

class HomeHero extends React.Component {
    render() {
        return (
            <StyledHomeHero className="container">
              <h1>Find a nearby COVID-19 test center</h1>
              <ZipForm large />
            </StyledHomeHero>
        );
    }
}

export default HomeHero;
