/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { Link } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import {
    UncontrolledCollapse,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from 'reactstrap';

class DemoNavbar extends React.Component {
    componentDidMount() {
        let headroom = new Headroom(document.getElementById('navbar-main'));
        // initialise
        headroom.init();
    }
    state = {
        collapseClasses: '',
        collapseOpen: false,
    };

    onExiting = () => {
        this.setState({
            collapseClasses: 'collapsing-out',
        });
    };

    onExited = () => {
        this.setState({
            collapseClasses: '',
        });
    };

    render() {
        return (
            <>
                <header className='header-global'>
                    <Navbar
                        className='navbar-main navbar-transparent navbar-light headroom'
                        expand='lg'
                        id='navbar-main'
                    >
                        <Container>
                            <NavbarBrand className='mr-lg-5' to='/' tag={Link}>
                                <img
                                    alt='...'
                                    src={require('assets/img/brand/GetTestedCovid19Finallogowhitebottom.png')}
                                />
                            </NavbarBrand>
                            <button
                                className='navbar-toggler'
                                id='navbar_global'
                            >
                                <span className='navbar-toggler-icon' />
                            </button>
                            <UncontrolledCollapse
                                toggler='#navbar_global'
                                navbar
                                className={this.state.collapseClasses}
                                onExiting={this.onExiting}
                                onExited={this.onExited}
                            >
                                <div className='navbar-collapse-header'>
                                    <Row>
                                        <Col className='collapse-brand' xs='6'>
                                            <Link to='/'>
                                                <img
                                                    alt='...'
                                                    src={require('assets/img/brand/GetTestedCovid19Finallogowhitebottom.png')}
                                                />
                                            </Link>
                                        </Col>
                                        <Col className='collapse-close' xs='6'>
                                            <button
                                                className='navbar-toggler'
                                                id='navbar_global'
                                            >
                                                <span />
                                                <span />
                                            </button>
                                        </Col>
                                    </Row>
                                </div>

                                <Nav
                                    className='navbar-nav-hover align-items-lg-center ml-lg-auto mt-0 pt-0'
                                    navbar
                                >
                                    <NavItem>
                                        <NavLink
                                            className='nav-link-icon mt-0 pt-0'
                                            href='/test-site-search'
                                        >
                                            <i className='ni ni-collection d-lg-none mr-1' />
                                            <span className='nav-link-inner--text mt-0 pt-0'>
                                                Find a test center
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className='nav-link-icon mt-0 pt-0'
                                            href='/about'
                                        >
                                            <i className='ni ni-collection d-lg-none mr-1 pt-0 mt-0' />
                                            <span className='nav-link-inner--text'>
                                                About
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            caret
                                            nav
                                            className='nav-link-icon mt-0 pt-0 pr-5'
                                        >
                                            <i className='ni ni-collection d-lg-none mr-1' />
                                            <span className='nav-link-inner--text mt-0 pt-0'>
                                                Resources
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu
                                            aria-labelledby='navbar-default_dropdown_1'
                                            right
                                        >
                                            <DropdownItem href='/resources'>
                                                General
                                            </DropdownItem>
                                            <DropdownItem href='/when-should-you-get-tested'>
                                                When Should You Get Tested
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    
                                </Nav>
                            </UncontrolledCollapse>
                        </Container>
                    </Navbar>
                </header>
            </>
        );
    }
}

export default DemoNavbar;
