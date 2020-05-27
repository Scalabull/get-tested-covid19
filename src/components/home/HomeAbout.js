
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

  .container {
    padding: 50px 15px;
  }

  .home-about__content {
    p {
      max-width: 600px;
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: ${props => props.theme.bpSmall}) {

    .container {
      padding: 80px 15px;
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
            <h2>Testing is critical for overcoming COVID-19</h2>
            <p>Get Tested COVID-19 is a project run by a team of volunteers working to provide accurate information about test centers and testing resources for the US.</p>
            <p>See an issue? Let us know and we'll fix it. Stay safe.</p>
            <div className="mt-3">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdr_SEZYn9s6SOahSEGMkrWn4_p-9sCJQf9HtWFyNR9mAPCow/viewform?usp=sf_link" className="btn btn-primary">Contact us</a>
              <Link className="btn btn-outline-primary ml-2" to="/about">Learn more</Link>
            </div>
          </div>
          <div className="home-about__img">
            <h2>Donate</h2>
            <div dangerouslySetInnerHTML={{ __html: `<script src="https://donorbox.org/widget.js" paypalExpress="false"></script><iframe allowpaymentrequest="" frameborder="0" height="600px" name="donorbox" scrolling="no" seamless="seamless" src="https://donorbox.org/embed/gettestedcovid?default_interval=o&hide_donation_meter=true" style="max-width: 500px; min-width: 350px; max-height:none!important" width="100%"></iframe>`}} />
          </div>
        </div>
      </StyledHomeAbout>
    );
  }
}

export default HomeAbout;
