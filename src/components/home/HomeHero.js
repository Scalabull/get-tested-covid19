
import React from 'react';
import styled from 'styled-components'
import ZipForm from 'components/shared/ZipForm.js';
import { ReactComponent as IllustrRight } from '../../assets/img/ill/home-buildings.svg';
import { ReactComponent as IllustrLeft } from '../../assets/img/ill/home-lady.svg';

const StyledHomeHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 80px 15px 220px;
  text-align: center;
  color: #fff;
  background-color: ${props => props.theme.colorPurple};
  position: relative;

  h1 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
    font-size: 1.35rem;

    @media screen and (max-width: ${props => props.theme.bpSmall}) {
      font-size: 1.1rem;
    }
  }

  .container {
    z-index: 1000;
  }

  .form-inline {
    justify-content: center;

    .input-group {
      width: 500px;

      @media screen and (max-width: 500px) {
        width: auto;
      }
    }
  }

  .home__bg-left, .home__bg-right {
    position: absolute;
    bottom: 0;
  }

  .home__bg-left {
    left: 0;
    width: 271px;

    @media screen and (max-width: ${props => props.theme.bpMed}) {
      display: none;
    }
  }

  .home__bg-right {
    right: 0;
    width: 483px;

    @media screen and (max-width: ${props => props.theme.bpMed}) {
      width: 300px;
      right: 50%;
      transform: translateX(50%);
    }
  }
`

class HomeHero extends React.Component {
  render() {
    return (
      <StyledHomeHero>
        <div className="container">
          <h1>Find a nearby COVID-19 test center</h1>
          <p>Search over 2,000 verified test centers in the US.</p>
          <ZipForm large autoFocus showLocate />
        </div>
        <div className="home__bg">
          <IllustrLeft className="home__bg-left" />
          <IllustrRight className="home__bg-right" />
        </div>
      </StyledHomeHero>
    );
  }
}

export default HomeHero;
