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

// reactstrap components
import { Button, Card, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';

class Profile extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    render() {
        return (
            <>
                <DemoNavbar />
                <main className='profile-page' ref='main'>
                    <section className='section-profile-cover section-shaped my-0'>
                        {/* Circles background */}
                        <div className='shape shape-style-1 shape-default alpha-4'>
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        {/* SVG separator */}
                        <div className='separator separator-bottom separator-skew'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                preserveAspectRatio='none'
                                version='1.1'
                                viewBox='0 0 2560 100'
                                x='0'
                                y='0'
                            >
                                <polygon
                                    className='fill-white'
                                    points='2560 0 2560 100 0 100'
                                />
                            </svg>
                        </div>
                    </section>
                    <section className='section'>
                        <Container>
                            <Card className='card-profile shadow mt--300'>
                                <iframe
                                    height='600'
                                    frameborder='0'
                                    scrolling='no'
                                    marginheight='0'
                                    marginwidth='0'
                                    src='https://www.openstreetmap.org/export/embed.html?bbox=-152.05078125%2C13.15437605541853%2C-61.52343750000001%2C56.607885465009254&amp;layer=mapnik'
                                ></iframe>
                            </Card>
                        </Container>
                    </section>
                </main>
                <SimpleFooter />
            </>
        );
    }
}

export default Profile;
