
import React from 'react';
import styled from 'styled-components'
import ZipForm from 'components/shared/ZipForm.js';

const StyledHomeHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 15px 120px;
  text-align: center;

  h1 {
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 20px;
    font-size: 1.35rem;

    @media screen and (max-width: ${props => props.theme.bpSmall}) {
      font-size: 1.1rem;
    }
  }
`

class HomeHero extends React.Component {
  render() {
    return (
      <StyledHomeHero className="container">
        <h1>Find a nearby COVID-19 test center</h1>
        <p>Search over 2,000 test centers in the US.</p>
        <ZipForm large autoFocus />
      </StyledHomeHero>
    );
  }
}

export default HomeHero;
