import React from 'react';
import DocumentMeta from 'react-document-meta';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';
import styled from 'styled-components';
import { ReactComponent as HeroIll } from '../../assets/img/ill/partners-hero.svg';
import { ReactComponent as PartnersIll } from '../../assets/img/ill/about-partners.svg';

const StyledPartners = styled.div`

    .partners-section {
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

    .partners-section__content {
        padding-right: 3rem;
        max-width: 650px;

        svg {
          max-width: 100%;
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          padding-right: 0;
        }
    }

    .partners-section__extra {
        svg {
            max-width: 360px;
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          text-align: center;
          width: 100%;
        }
    }

    .partners__hero {
        background-color: ${props => props.theme.colorPurple};
        color: #fff;
    }

    .partners__technical {

        .partners-section {
            align-items: flex-start;
            justify-content: center;
        }

        .partners-section__extra {
            max-width: 220px;

            img {
              max-width: 100%;
              margin-bottom: 30px;
            }
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          .partners-section__extra {
              margin-top: 2rem;
              max-width: none;

              img {
                max-width: 220px;
              }
          }
        }
    }

    .partners__community {
      background-color: ${props => props.theme.colorGrayLight};
    }

    .partner-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 450px;
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

    .partner-card__left {
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

        .partner-card__site {
          color: #666;
          margin-top: 3px;
          font-size: 0.9rem;
        }
    }

`

class PartnersPage extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    render() {
        const meta = {
            title: 'Our Partners | Get Tested COVID-19',
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
                <StyledPartners>
                    <div className="partners__hero">
                        <div className="container partners-section">
                            <div className="partners-section__content">
                                <h1>Our Partners</h1>
                                <p>Thanks to our partners, we’re able to help you, COVID-19 test centers, and communities around the country.</p>
                            </div>
                            <div className="partners-section__extra">
                                <HeroIll />
                            </div>
                        </div>
                    </div>
                    <div className="partners__technical">
                        <div className="container partners-section">
                            <div className="partners-section__content">
                                <h2>Technical Support</h2>
                                <p>Beyond our amazing team of volunteers, we’ve received incredible and much-needed support from tech providers, developers, clinical laboratories, and platforms.</p>
                                <p>Thank you to Circle CI, Amazon AWS, Mapbox, Google Maps, Google Cloud, Auth0, Asana, and Slack for providing us with generous credits that help run this project. We’re also grateful to Help COVID, Full Stack Academy, and Scalabull for their support, contacts, and information.</p>
                                <p>We’re continually building and improving our dataset thru web scrapers, and machine learning for text extraction (NLP) and merging data from different sources confidently. We’re also blending human-validated data sourced from the community and our own team.</p>
                                <p>We believe in open source collaboration and transparency as much as possible. We chose Javascript for the full stack because almost all of the volunteers have experience with it. React.js on the client side and Node.js APIs. We were also fortunate to get free credits from AWS and CircleCI which we’ve used for our devOps infrastructure.</p>
                                <p>We’ve got a small data science team crunching our data in Python to provide helpful insights to responders in the healthcare industry, and Tableau helps us visualize our data analyses.</p>
                            </div>
                            <div className="partners-section__extra">
                              <img
                                alt="Amazon Web Services"
                                src={require("assets/img/logos/aws.png")}
                              />
                              <img
                                alt="Google"
                                src={require("assets/img/logos/googlecloud.png")}
                              />
                              <img
                                alt="Mapbox"
                                src={require("assets/img/logos/mapbox.png")}
                              />
                              <img
                                alt="Auth0"
                                src={require("assets/img/logos/auth0.png")}
                              />
                              <img
                                alt="Asana"
                                src={require("assets/img/logos/asana.png")}
                              />
                              <img
                                alt="Slack"
                                src={require("assets/img/logos/slack.png")}
                              />
                              <img
                                alt="Slack"
                                src={require("assets/img/logos/tablaeu.png")}
                              />
                              <img
                                alt="Full Stack Academy"
                                src={require("assets/img/logos/fullstack.png")}
                              />
                            </div>
                        </div>
                    </div>
                    <div className="partners__community">
                        <div className="container partners-section">
                            <div className="partners-section__content">
                                <h2>Community Resources</h2>
                                <p>We’ve partnered up with other COVID-19 relief initiatives and nonprofits to better support communities and testing centers around the US. As we communicate with test centers to validate the information in our database, we’re able to offer them much-needed resources and connect them with our partner organizations. </p>
                                <PartnersIll />
                            </div>
                            <div className="partners-section__extra">
                                <a className="partner-card" href="https://www.endcoronavirus.org/" target="_blank" rel="noopener noreferrer">
                                    <div className="partner-card__left">
                                        <div className="partner-card__content">
                                            <strong>End Coronavirus</strong>
                                            <p>A team of over 4,000 volunteers that includes scientists, engineers, medical doctors, and motivated individuals ready to take action.</p>
                                            <div className="partner-card__site">endcoronavirus.org</div>
                                        </div>
                                    </div>
                                    <div className="partner-card__right">
                                        <i className="fas fa-chevron-right" />
                                    </div>
                                </a>
                                <a className="partner-card" href="https://masksfordocs.com/" target="_blank" rel="noopener noreferrer">
                                    <div className="partner-card__left">
                                        <div className="partner-card__content">
                                            <strong>Masks for Docs</strong>
                                            <p>A grassroots organization that uses the power of community to connect doctors and hospitals with the resources they need.</p>
                                            <div className="partner-card__site">masksfordocs.com</div>
                                        </div>
                                    </div>
                                    <div className="partner-card__right">
                                        <i className="fas fa-chevron-right" />
                                    </div>
                                </a>
                                <a className="partner-card" href="https://findthemasks.com/" target="_blank" rel="noopener noreferrer">
                                    <div className="partner-card__left">
                                        <div className="partner-card__content">
                                            <strong>Find the Masks</strong>
                                            <p>A global mapping tool and interactive directory for PPE needs built by volunteers collaborating worldwide.</p>
                                            <div className="partner-card__site">findthemasks.org</div>
                                        </div>
                                    </div>
                                    <div className="partner-card__right">
                                        <i className="fas fa-chevron-right" />
                                    </div>
                                </a>
                                <a className="partner-card" href="https://www.getppe.me/" target="_blank" rel="noopener noreferrer">
                                    <div className="partner-card__left">
                                        <div className="partner-card__content">
                                            <strong>Get them PPE</strong>
                                            <p>A site that identifies undersupplied hospitals and organizations,  and connects them with PPE donations via crowdsourcing.</p>
                                            <div className="partner-card__site">getppe.me</div>
                                        </div>
                                    </div>
                                    <div className="partner-card__right">
                                        <i className="fas fa-chevron-right" />
                                    </div>
                                </a>
                                <a className="partner-card" href="https://www.ovation.io/" target="_blank" rel="noopener noreferrer">
                                    <div className="partner-card__left">
                                        <div className="partner-card__content">
                                            <strong>Ovation</strong>
                                            <p>A scientific data company providing a cloud-based LIMS for molecular diagnostic laboratories.</p>
                                            <div className="partner-card__site">ovation.io</div>
                                        </div>
                                    </div>
                                    <div className="partner-card__right">
                                        <i className="fas fa-chevron-right" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </StyledPartners>
                <NavFooter/>
            </DocumentMeta>
        );
    }
}

export default PartnersPage;
