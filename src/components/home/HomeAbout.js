
import React from 'react';
import styled from 'styled-components'
import ZipForm from 'components/shared/ZipForm.js';

const StyledHomeHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 400px;
  text-align: center;

  h1 {
      margin-bottom: 15px;
  }

  p {
      margin-bottom: 20px;
  }
`

class HomeHero extends React.Component {
    render() {
        return (
            <StyledHomeHero className="container">
              <h1>Find a nearby COVID-19 test center</h1>
              <p>Search over 5,000 test centers in the United States.</p>
              <ZipForm large />
            </StyledHomeHero>
        );
    }
}

export default HomeHero;
