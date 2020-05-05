
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
      color: rgba(255,255,255,0.75);
    }
  }

  @media screen and (max-width: ${props => props.theme.bpSmall}) {
    text-align: center;

    .container, ul {
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
          <div className="footer__copy">
            &copy; Get Tested COVID-19
          </div>
        </div>
      </StyledNavFooter>
    );
  }
}

export default NavFooter;
