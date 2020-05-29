
import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledNavFooter = styled.div`
  border-top: 1px solid #eee;
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
    margin-right: 1rem;

    a {
      padding: 5px;
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
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/how-testing-works">How Testing Works</Link></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://medium.com/@gettestedcovid/">News</a></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>
          <div className="footer__right">
            <div className="footer__links">
              <a href="https://www.instagram.com/gettestedcovid/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
              <a href="https://www.facebook.com/gettestedcovid/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" /></a>
              <a href="https://twitter.com/gettestedcovid" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
              <a href="https://www.linkedin.com/company/gettestedcovid/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
            </div>
            &copy; Get Tested COVID-19
          </div>
        </div>
      </StyledNavFooter>
    );
  }
}

export default NavFooter;
