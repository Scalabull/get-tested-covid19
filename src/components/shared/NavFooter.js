
import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledNavFooter = styled.div`
  background-color: ${props => props.theme.colorPurple};
  box-shadow: 0 50vh 0 50vh ${props => props.theme.colorPurple};
  color: rgba(255,255,255,0.75);
  font-size: 13px;

  .container {
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul {
    list-style: none;
    display: flex;
    margin-bottom: 0;
    padding-left: 0;

    a {
      padding: 10px;
      text-transform: uppercase;
      font-size: 12px;
      color: #fff;
      font-weight: 400;
    }
  }

  .footer__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .footer__links {
    font-size: 1.25rem;
    color: #fff;
    margin-right: 1rem;

    a {
      padding: 5px;
      color: #fff;
      margin-left: 3px;
    }
  }

  @media screen and (max-width: ${props => props.theme.bpSmall}) {
    text-align: center;

    .container, ul, .footer__right {
      flex-direction: column;
    }

    ul {
      margin-bottom: 1rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
`

class NavFooter extends React.Component {
  render() {
    return (
      <StyledNavFooter>
        <div className="container d-flex">
          <div>
            <ul>
              <li><Link to="/about">Resources</Link></li>
              <li><Link to="/when-to-get-tested">When To Get Tested</Link></li>
              <li><Link to="/how-testing-works">How Testing Works</Link></li>
              <li><a href="https://medium.com/@get_tested_covid19">News</a></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          <div className="footer__right">
            <div className="footer__links">
              <a href="https://www.instagram.com/gettestedcovid/"><i className="fa fa-instagram" /></a>
              <a href="https://www.facebook.com/GetTestedCOVID19/"><i className="fa fa-facebook" /></a>
              <a href="https://twitter.com/GetTested_COVID"><i className="fa fa-twitter" /></a>
            </div>
            &copy; Get Tested COVID-19
          </div>
        </div>
      </StyledNavFooter>
    );
  }
}

export default NavFooter;
