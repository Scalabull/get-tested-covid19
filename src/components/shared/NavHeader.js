import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import styled from 'styled-components';
import ZipForm from './ZipForm';

const StyledNavHeader = styled.header`
  font-size: 14px;
  color: #fff;
  background-color: ${props => props.theme.colorPurple};

  .navbar-dark .navbar-nav a.nav-link {
    color: #fff;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }

  .header__logo {
    height: 50px;
    margin-left: -20px;
    margin-right: -20px;
  }

  .navbar-toggler {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .navbar-collapse {
    justify-content: flex-end;
  }

  .header__search {
    width: 100%;

    > div, .form-inline, .form-group {
      width: 100%;
    }
  }

  .header__left {
    @media screen and (max-width: ${props => props.theme.bpSmall}) {
      width: 100%;

      .header__search {
        margin-top: 10px;
      }
    }
  }
`

const NavHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <StyledNavHeader className="sticky-top" minimal={props.minimal}>
      <Navbar expand="lg" dark className={`${props.wide ? '' : 'container'}`}>
        <div className="header__left d-flex flex-column align-items-start align-items-sm-center flex-sm-row">
          <NavbarBrand href="/">
            <img className="header__logo" alt='Get Tested Covid Logo' src={require('assets/img/brand/GetTestedCovid19Finallogocolorfinal_white.png')} />
          </NavbarBrand>
          {!props.hideZipForm && (
            <div className="header__search">
              <ZipForm />
            </div>
          )}
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/resources">Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/when-to-get-tested">When To Get Tested</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/how-testing-works">How Testing Works</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://medium.com/@get_tested_covid19">News</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </StyledNavHeader>
  );
}

export default NavHeader;