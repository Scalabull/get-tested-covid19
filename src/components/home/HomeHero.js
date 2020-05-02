
import React from 'react';
import styled from 'styled-components'
import ZipForm from 'components/shared/ZipForm.js';

const StyledHomeHero = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 15px;
`

class HomeHero extends React.Component {
    render() {
        return (
            <StyledHomeHero>
              <h4 className='display-3 text-white'>Find a COVID-19 community-test center near you.</h4>
              <ZipForm />
            </StyledHomeHero>
        );
    }
}

export default HomeHero;
