
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
              <li><Link href="/about">Resources</Link></li>
              <li><Link href="/when-to-get-tested">When To Get Tested</Link></li>
              <li><Link href="/how-testing-works">How Testing Works</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div className="footer__right">
            <div className="footer__links">
              <Link href="https://www.instagram.com/gettestedcovid/"><i className="fa fa-instagram" /></Link>
              <Link href="https://www.facebook.com/GetTestedCOVID19/"><i className="fa fa-facebook" /></Link>
              <Link href="https://twitter.com/GetTested_COVID"><i className="fa fa-twitter" /></Link>
              <Link href="https://medium.com/@get_tested_covid19"><i className="fa fa-medium" /></Link>
            </div>
            &copy; Get Tested COVID-19
          </div>
        </div>
      </StyledNavFooter>
    );
  }
}

export default NavFooter;
