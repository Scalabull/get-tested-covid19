import React from 'react';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import DocumentMeta from 'react-document-meta';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';

class AboutPage extends React.Component {
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
                <NavHeader />
                <main ref='main'>
                    <section className='section mt-5 mb-5'>
                        <Container className='py-lg-md d-flex'>
                            <div className='col px-0'>
                                <Row>
                                    <Col lg='8'>
                                        <h1 className='display-4 mb-2 mt-3'>
                                            About
                                        </h1>
                                        <p className='lead'>
                                            Get Tested COVID-19 is a project
                                            started by people like you who
                                            wanted to help support our
                                            broader community.
                                        </p>
                                        <p>
                                            We need help with software
                                            development, outreach, and
                                            financial support. If you would
                                            like to work on the project,
                                            please reach out to us{' '}
                                            <a
                                                href='mailto:info@get-tested-covid19.org'
                                            >
                                                via email
                                            </a>
                                            . You can also visit{' '}
                                            <a href='https://github.com/Scalabull/get-tested-covid19'>
                                                our GitHub
                                            </a>
                                            .
                                        </p>
                                        <p className="pb-3">
                                            If you want updates, to be
                                            informed of the community test
                                            center database, and learn other
                                            information as it becomes
                                            available, follow us on{' '}
                                            <a
                                                href='https://www.instagram.com/gettestedcovid/'
                                            >
                                                Instagram.
                                            </a>
                                        </p>
                                        <h4>
                                            Other Links
                                        </h4>
                                        <ul className="pl-3">
                                            <li>
                                                Add to our test center
                                                database:{' '}
                                                <a
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
                </main>
                <NavFooter/>
            </DocumentMeta>
        );
    }
}

export default AboutPage;
