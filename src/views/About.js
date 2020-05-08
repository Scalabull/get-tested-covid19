
import React from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import DocumentMeta from 'react-document-meta';

class About extends React.Component {
    state = {};
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    render() {
        const meta = {
            title: 'About Our Project | Get Tested COVID-19',
            description:
                'Get-tested-COVID-19 is community led. We are working to make it easy for anyone in the US to find a testing site near them.',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'COVID-19, testing centers, novel coronavirus',
                },
            },
        };

        return (
            <DocumentMeta {...meta}>
                <DemoNavbar />
                <main ref='main'>
                    <div className='position-relative'>
                        {/* shape Hero */}
                        <section className='section section-lg section-shaped pb-100'>
                            <div className='shape shape-style-1 shape-default'>
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                            <Container className='py-lg-md d-flex'>
                                <div className='col px-0'>
                                    <Row>
                                        <Col lg='12'>
                                            <h1 className='display-3 text-white mb-5 mt-3'>
                                                About
                                            </h1>
                                            <p className='lead text-white'>
                                                Get-tested-COVID-19 is a project
                                                started by people like you who
                                                wanted to help support our
                                                broader community.
                                            </p>
                                            <p className='text-white'>
                                                We need help with software
                                                development, outreach, and
                                                financial support. If you would
                                                like to work on the project,
                                                please reach out to us{' '}
                                                <a
                                                    className='text-success'
                                                    href='mailto:info@get-tested-covid19.org'
                                                >
                                                    via email
                                                </a>
                                                . You can also visit{' '}
                                                <a
                                                    className='text-success'
                                                    href='https://github.com/Scalabull/get-tested-covid19'
                                                >
                                                    our GitHub
                                                </a>
                                                .
                                            </p>
                                            <p className='text-white'>
                                                If you want updates, to be
                                                informed of the community test
                                                center database, and learn other
                                                information as it becomes
                                                available, follow us on{' '}
                                                <a
                                                    className='text-success'
                                                    href='https://www.instagram.com/gettestedcovid/'
                                                >
                                                    Instagram.
                                                </a>
                                            </p>
                                            <h4 className='text-white'>
                                                Other Links
                                            </h4>
                                            <ul className='text-white'>
                                                <li>
                                                    Add to our test center
                                                    database:{' '}
                                                    <a
                                                        className='text-success'
                                                        href='https://forms.gle/tBj9HrHQHNFJf4Ju7'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        here.
                                                    </a>
                                                </li>
                                                <li>
                                                    Are you a provider, lab,
                                                    government representative,
                                                    or other authority with an
                                                    interest in our
                                                    organization?{' '}
                                                    <a
                                                        className='text-success'
                                                        href='https://forms.gle/yWHUZPmMWjWJvLnv5'
                                                    >
                                                        Use this form.
                                                    </a>
                                                </li>
                                                <li>
                                                    Are you a potential
                                                    promoter, partner, or
                                                    sponsor?{' '}
                                                    <a
                                                        className='text-success'
                                                        href='mailto:info@get-tested-covid19.org'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        Email us.
                                                    </a>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </section>
                    </div>
                </main>
                <SimpleFooter></SimpleFooter>
            </DocumentMeta>
        );
    }
}

export default About;
