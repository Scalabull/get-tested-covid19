import React from 'react';
import DocumentMeta from 'react-document-meta';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';
import styled from 'styled-components';
import { ReactComponent as HeroIll } from '../../assets/img/ill/about-hero.svg';
import { ReactComponent as TeamIll } from '../../assets/img/ill/about-team.svg';
import { ReactComponent as PartnersIll } from '../../assets/img/ill/about-partners.svg';
import { Link } from 'react-router-dom';
import ZipForm from 'components/shared/ZipForm.js';

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

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          flex-direction: column;
          justify-content: center;
        }
    }

    .about-section__content {
        padding-right: 3rem;
        max-width: 650px;

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          padding-right: 0;
        }
    }

    .about-section__extra {
        svg {
            max-width: 360px;
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          text-align: center;
          width: 100%;

          svg {
              width: 80%;
          }
        }
    }

    .about-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        padding: 1.75rem 1.25rem;
        color: ${props => props.theme.colorPurple};
        background-color: #fff;
        border-radius: 3px;
        margin-bottom: 1rem;

        &:hover {
            text-decoration: none;
            box-shadow: 0 0 0 1px ${props => props.theme.colorPurple};
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          text-align: left;
          width: 100%;
          min-width: none;
        }
    }

    .about-card__left {
        display: flex;
        align-items: center;
        margin-right: 2rem;

        i {
            font-size: 32px;
            margin-right: 10px;
        }

        strong {
            font-weight: 600;
            padding-bottom: 1rem;
            font-size: 1.1rem;
        }

        p {
            margin-bottom: 0;
            font-size: 0.9rem;
        }
    }

    .about__hero, .about__partners {
        background-color: ${props => props.theme.colorPurple};
        color: #fff;
    }

    .about__mission {
        background-color: ${props => props.theme.colorGrayLight};

        .about-section {
            align-items: flex-start;
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          .about-section__extra {
              margin-top: 2rem;
          }
        }
    }

    .about__database {
        .container {
            padding: 8rem 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .about__database-content {
        text-align: center;

        h2 {
            margin-bottom: 1rem;
        }

        p {
            max-width: 700px;

            strong {
                font-weight: 500;
                margin-bottom: 2rem;
                font-size: 1.5rem;
            }
        }
    }

    .about__facts {
        background-color: ${props => props.theme.colorBlueDark};
        color: #fff;

        .container {
            padding: 4rem 1rem 3.8rem;
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
        }

        li {
            margin-right: 2rem;
            font-size: 1.5rem;

            strong {
                font-size: 3rem;
                font-weight: 600;
                color: ${props => props.theme.colorBlueLight};
            }
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          ul {
              flex-direction: column;
          }

          li {
              margin-right: 0;
          }
        }
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
                                <Link className="about-card" to="/">
                                    <div className="about-card__left">
                                        <i className="fas fa-hospital" />
                                        <div className="about-card__content">
                                            <strong>Find</strong>
                                            <p>Locate COVID-19 testing centers</p>
                                        </div>
                                    </div>
                                    <div className="about-card__right">
                                        <i className="fas fa-chevron-right" />
                                    </div>
                                </Link>
                                <a className="about-card" href="https://medium.com/get-tested-covid-19" target="_blank" rel="noopener noreferrer">
                                    <div className="about-card__left">
                                        <i className="fas fa-info-circle" />
                                        <div className="about-card__content">
                                            <strong>Learn</strong>
                                            <p>Stay informed about COVID-19 testing</p>
                                        </div>
                                    </div>
                                    <div className="about-card__right">
                                        <i className="fas fa-chevron-right" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="about__database">
                        <div className="container">
                            <div className="about__database-content">
                                <h2>Our Database</h2>
                                <p><strong>We have the most complete database of COVID-19 test centers in the US: 3,000+ sites and growing.</strong></p>
                                <p>Just search your zip code to find the nearest centers.</p>
                            </div>
                            <ZipForm large />
                        </div>
                    </div>
                    <div className="about__facts">
                        <div className="container">
                            <h2>Fast Facts: Get Tested COVID-19</h2>
                            <ul>
                                <li><strong>3,000</strong> test centers</li>
                                <li><strong>35</strong> states</li>
                                <li><strong>57</strong> centers per state</li>
                                <li><strong>5%</strong> drive thru</li>
                            </ul>
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
