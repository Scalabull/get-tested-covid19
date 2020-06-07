import React from 'react';
import DocumentMeta from 'react-document-meta';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';
import styled from 'styled-components';
import { ReactComponent as HeroIll } from '../../assets/img/ill/about-hero.svg';
import { ReactComponent as TeamIll } from '../../assets/img/ill/about-team.svg';
import { ReactComponent as PartnersIll } from '../../assets/img/ill/about-partners.svg';

const StyledAbout = styled.div`

    .about-section {
        padding: 6rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1, h2 {
            margin-bottom: 1rem;
            font-size: 36px;
        }
    }

    .about-section__content {
        padding-right: 3rem;
        max-width: 650px;
    }

    .about-section__extra {
        svg {
            max-width: 360px;
        }
    }

    .about__hero, .about__partners {
        background-color: ${props => props.theme.colorPurple};
        color: #fff;
    }

    .about__mission {
        background-color: ${props => props.theme.colorGrayLight};
    }
`

class AboutPage extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
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
                <StyledAbout>
                    <div className="about__hero">
                        <div className="container about-section">
                            <div className="about-section__content">
                                <h1>About Get Tested COVID-19</h1>
                                <p>Widespread testing is one of the key measures that will help the US (and the world) manage COVID-19. Get Tested COVID-19 was founded to help support communities across the US with testing resources.</p>
                            </div>
                            <div className="about-section__extra">
                                <HeroIll />
                            </div>
                        </div>
                    </div>
                    <div className="about__mission">
                        <div className="container about-section">
                            <div className="about-section__content">
                                <h2>Our Mission</h2>
                                <p>Get Tested COVID-19 is a volunteer, community-led project founded to help the US reach 500,000 quality viral COVID-19 tests per day by maintaining an active, accurate database of designated COVID-19 test centers.</p>
                                <p>We believe that knowledge is power and that everyone deserves easy access to COVID-19 resources. In addition to maintaining our testing center database, we also connect test centers with the resources they need, gather helpful information to share, and partner with communities, companies, and institutions on other COVID-19 support projects. </p>
                            </div>
                            <div className="about-section__extra">
                                CTAs
                            </div>
                        </div>
                    </div>
                    <div className="about__team">
                        <div className="container about-section">
                            <div className="about-section__content">
                                <h2>Our Team</h2>
                                <p>Get Tested COVID-19 is run by a team of volunteers, distributed across four countries and seven time zones.</p>
                                <p>Since establishing the project, the founders have received 120+ volunteer requests and currently have 45+ active volunteers, including developers, designers, data scientists, content writers, social media producers, and marketers.</p>
                                <p>Some volunteers work full time for larger tech companies, some are freelancers, and others have been recently laid off and are choosing to spend their time on COVID-19 related projects. The common theme is a desire to help and contribute something during this crisis, and this project is an opportunity to use our skills and expertise.</p>
                            </div>
                            <div className="about-section__extra">
                                <TeamIll />
                            </div>
                        </div>
                    </div>
                    <div className="about__partners">
                        <div className="container about-section">
                            <div className="about-section__content">
                                <h2>Our Partners</h2>
                                <p>Beyond our amazing team of volunteers, we’ve received incredible and much-needed support from tech providers, developers, clinical laboratories, and platforms.</p>
                                <p>We’ve also partnered up with other COVID-19 relief initiatives and nonprofits to support communities and testing centers around the US. As we communicate with test centers to validate the information in our database, we’re able to offer them much-needed resources and connect them with our partner organizations.</p>
                            </div>
                            <div className="about-section__extra">
                                <PartnersIll />
                            </div>
                        </div>
                    </div>
                </StyledAbout>
                <NavFooter/>
            </DocumentMeta>
        );
    }
}

export default AboutPage;
