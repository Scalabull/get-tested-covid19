
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Headroom from 'headroom.js';
// import {
//     UncontrolledCollapse,
//     NavbarBrand,
//     NavbarToggler,
//     Navbar,
//     NavItem,
//     NavLink,
//     Nav,
//     Container,
//     Row,
//     Col,
//     Collapse
// } from 'reactstrap';
// import styled from 'styled-components';

// const StyledNavHeader = styled.header`

// `

// const NavHeader = props => {
//    const [isOpen, setIsOpen] = useState(false);

//    const toggle = () => setIsOpen(!isOpen);


//         return (
//             <StyledNavHeader>
//                 <Navbar color="light" light expand="md">
//                   <NavbarBrand href="/">reactstrap</NavbarBrand>
//                   <NavbarToggler onClick={toggle} />
//                   <Collapse isOpen={isOpen} navbar>
//                     <Nav className="mr-auto" navbar>
//                       <NavItem>
//                         <NavLink href="/components/">Components</NavLink>
//                       </NavItem>
//                       <NavItem>
//                         <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//                       </NavItem>
//                     </Nav>
//                   </Collapse>
//                 </Navbar>
//                 <header className='header-global'>
//                     <Navbar
//                         className='navbar-main navbar-transparent navbar-light headroom'
//                         expand='lg'
//                         id='navbar-main'
//                     >
//                         <Container className='navbar-container'>
//                             <NavbarBrand className='mr-lg-5' to='/' tag={Link}>
//                                 <img
//                                     alt='Get Tested Covid Logo'
//                                     src={require('assets/img/brand/GetTestedCovid19Finallogocolorfinal.png')}
//                                 />
//                             </NavbarBrand>
//                             <button
//                                 className='navbar-toggler'
//                                 id='navbar_global'
//                             >
//                                 <span className='navbar-toggler-icon' />
//                             </button>
//                             <UncontrolledCollapse
//                                 toggler='#navbar_global'
//                                 navbar
//                                 className={this.state.collapseClasses}
//                                 onExiting={this.onExiting}
//                                 onExited={this.onExited}
//                             >
//                                 <div className='navbar-collapse-header'>
//                                     <Row>
//                                         <Col className='collapse-brand' xs='6'>
//                                             <Link to='/'>
//                                                 <img
//                                                     alt='...'
//                                                     src={require('assets/img/brand/GetTestedCovid19Finallogocolorfinal.png')}
//                                                 />
//                                             </Link>
//                                         </Col>
//                                         <Col className='collapse-close' xs='6'>
//                                             <button
//                                                 className='navbar-toggler'
//                                                 id='navbar_global'
//                                             >
//                                                 <span />
//                                                 <span />
//                                             </button>
//                                         </Col>
//                                     </Row>
//                                 </div>

//                                 <Nav
//                                     className='navbar-nav-hover align-items-lg-center ml-lg-auto mt-0 pt-0'
//                                     navbar
//                                 >
//                                     <NavItem>
//                                         <NavLink
//                                             className='nav-link-icon mt-0 pt-0'
//                                             href='/resources'
//                                         >
//                                             <i className='ni ni-collection d-lg-none mr-1 pt-0 mt-0' />
//                                             <span className='nav-link-inner--text'>
//                                                 Resources
//                                             </span>
//                                         </NavLink>
//                                     </NavItem>
//                                     <NavItem>
//                                         <NavLink
//                                             className='nav-link-icon mt-0 pt-0'
//                                             href='/when-should-you-get-tested'
//                                         >
//                                             <i className='ni ni-collection d-lg-none mr-1 pt-0 mt-0' />
//                                             <span className='nav-link-inner--text'>
//                                                 When To Get Tested
//                                             </span>
//                                         </NavLink>
//                                     </NavItem>
//                                     <NavItem>
//                                         <NavLink
//                                             className='nav-link-icon mt-0 pt-0'
//                                             href='/resources'
//                                         >
//                                             <i className='ni ni-collection d-lg-none mr-1 pt-0 mt-0' />
//                                             <span className='nav-link-inner--text'>
//                                                 How Testing Works
//                                             </span>
//                                         </NavLink>
//                                     </NavItem>
//                                     <NavItem>
//                                         <NavLink
//                                             className='nav-link-icon mt-0 pt-0'
//                                             href='//how-testing-works'
//                                         >
//                                             <i className='ni ni-collection d-lg-none mr-1 pt-0 mt-0' />
//                                             <span className='nav-link-inner--text'>
//                                                 About
//                                             </span>
//                                         </NavLink>
//                                     </NavItem>
//                                 </Nav>
//                             </UncontrolledCollapse>
//                         </Container>
//                     </Navbar>
//                 </header>
//             </StyledNavHeader>
//         );
// }

// export default NavHeader;


import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Form,
  FormGroup,
  Button,
  Input
} from 'reactstrap';
import styled from 'styled-components';
import ZipForm from './ZipForm';

const StyledNavHeader = styled.header`
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
    <StyledNavHeader className="sticky-top">
      <Navbar color="light" light expand="lg">
        <div className="header__left d-flex flex-column align-items-start align-items-sm-center flex-sm-row">
          <NavbarBrand href="/">
            <img className="header__logo" alt='Get Tested Covid Logo' src={require('assets/img/brand/GetTestedCovid19Finallogocolorfinal.png')} />
          </NavbarBrand>
          {!props.hideSearch && (
            <div className="header__search">
              <ZipForm />
            </div>
          )}
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/about">Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/when-to-get-tested">When To Get Tested</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/how-testing-works">How Testing Works</NavLink>
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