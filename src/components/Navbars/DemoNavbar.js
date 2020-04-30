
import React from 'react';
import { Link } from 'react-router-dom';
import Headroom from 'headroom.js';

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
                        <Container className='navbar-container'>
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
                                            href='/'
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
                                            <DropdownItem href='/how-testing-works'>
                                                How Does Testing Work
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
