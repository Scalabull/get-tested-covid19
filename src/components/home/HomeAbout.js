
import React from 'react';
import styled from 'styled-components'
import footerHero from '../../assets/img/hero/Email_illustration.png';
import { Link } from 'react-router-dom';

const StyledHomeAbout = styled.div`
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .home-about__content {
    p {
      max-width: 600px;
      margin-bottom: 15px;
    }
  }

  @media screen and (max-width: ${props => props.theme.bpSmall}) {

    .container {
      padding: 60px 15px;
    }

    .home-about__content {
      text-align: center;

      h2 {
        font-size: 1.75rem;
      }
    }

    .home-about__img {
      display: none;
    }
  }
`

class HomeAbout extends React.Component {
  render() {
    return (
      <StyledHomeAbout>
        <div className="container d-flex align-items-center justify-content-between">
          <div className="home-about__content">
            <h2>Helping beat COVID-19</h2>
            <p>Testing is key to overcoming COVID-19. We're a team of volunteers working around-the-clock to provide accurate information on test centers. See an issue? Let us know and we'll fix it. Stay safe.</p>
            <div>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdr_SEZYn9s6SOahSEGMkrWn4_p-9sCJQf9HtWFyNR9mAPCow/viewform?usp=sf_link" className="btn btn-primary">Contact us</a>
              <Link className="btn btn-outline-primary ml-2" to="/about">Learn more</Link>
            </div>
          </div>
          <div className="home-about__img">
            <img src={footerHero} alt='Contact Get Tested COVID-19' />
          </div>
        </div>
      </StyledHomeAbout>
    );
  }
}

export default HomeAbout;
