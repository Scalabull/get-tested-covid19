import React from 'react';
import DocumentMeta from 'react-document-meta';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';
import styled from 'styled-components';
import { ReactComponent as HeroIll } from '../../assets/img/ill/team-hero.svg';
import { ReactComponent as PieIll } from '../../assets/img/ill/team-pie.svg';
import { ReactComponent as WorldIll } from '../../assets/img/ill/team-world.svg';

const StyledTeam = styled.div`
    .team-section {
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

    .team-section__content {
        padding-right: 3rem;
        max-width: 650px;

        svg {
          max-width: 100%;
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          padding-right: 0;
        }
    }

    .team-section__extra {
        svg {
            max-width: 360px;
        }

        @media screen and (max-width: ${props => props.theme.bpMed}) {
          text-align: center;
          width: 100%;
        }
    }

    .team__hero {
        background-color: #fff;
    }

    .team__diverse {
      background-color: ${props => props.theme.colorPurple};
      color: #fff;
      
      .container {
        padding: 6rem 1rem;
      }

      h2 {
        text-align: center;
        margin-bottom: 3rem;
      }
    }

    .diverse-content {
      display: flex;
    }

    .diverse-section {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      svg {
        width: 100%;
        margin-bottom: 2rem;
      }

      p {
        max-width: 350px;
      }
    }

    .team__list {

      .container {
        padding: 6rem 1rem;
      }
    }

    .list__header {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 3rem;

      h2 {
        margin-bottom: 1rem;
      }

      p {
        max-width: 600px;
      }
    }

    .list__section {
      background-color: ${props => props.theme.colorGrayLight};
      padding: 3rem;
      text-align: center;
      margin-bottom: 3rem;

      h3 {
        margin-bottom: 3rem;
        color: ${props => props.theme.colorPurple};
        font-family: ${props => props.theme.fontSans};
        font-weight: 600;
      }
    }

    .list__cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .list-card {
      background-color: #fff;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 1rem 1rem 0;
    }

    .list-card__avatar {
      border-radius: 50%;
      width: 100px;
      margin-bottom: 1rem;
    }

    .list-card__name {
      font-weight: 600;
      font-family: ${props => props.theme.fontSans};
    }

    .list-card__city {
    }

    .list-card__role {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 0;
    }

    .list-card__hr {
      background-color: ${props => props.theme.colorPink};
      width: 30px;
      height: 3px;
      margin: -5px 0 10px 0;
    }
`

class TeamPage extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    render() {
        const meta = {
            title: 'Our Team | Get Tested COVID-19',
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
                <StyledTeam>
                    <div className="team__hero">
                        <div className="container team-section">
                            <div className="team-section__content">
                                <h1>About the Team</h1>
                                <p>Get Tested COVID-19 is run by a team of volunteers — some work full time, some are freelancers, and others have been recently laid off and are choosing to spend their time on COVID-19 related projects. The common theme is a desire to use our skills and expertise to help our communities through this crisis.</p>
                            </div>
                            <div className="team-section__extra">
                                <HeroIll />
                            </div>
                        </div>
                    </div>
                    <div className="team__diverse">
                        <div className="container">
                          <h2>We Are a Diverse Team</h2>
                          <div className="diverse-content">
                            <div className="diverse-section">
                              <PieIll />
                              <p>We are developers, designers, data scientists, writers, social media managers, producers, marketers, and more.</p>
                            </div>
                            <div className="diverse-section">
                              <WorldIll />
                              <p>We are distributed across eleven cities in the US, three countries, and seven time zones.</p>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="team__list">
                      <div className="container">
                        <div className="list__header">
                          <h2>Meet the Volunteers</h2>
                          <p>Our volunteers come from a range of backgrounds — from experienced experts in their fields to current students — to collaborate together to build our database of COVID-19 testing centers, share data insights, and connect with partners & communities to provide support & resources. </p>
                        </div>
                        <div className="list__section">
                          <h3>Development</h3>
                          <div className="list__cards">
                            <div className="list-card">
                              <img
                                alt="Zach Boldyga"
                                src={require("assets/img/team/Zach.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Zach Boldyga</h4>
                              <p className="list-card__city">Seattle, WA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Co-Founder</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Burton Ye"
                                src={require("assets/img/team/Burton.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Burton Ye</h4>
                              <p className="list-card__city">San Francisco, CA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Front-end Developer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Kevin Genus"
                                src={require("assets/img/team/Kevin.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Kevin Genus</h4>
                              <p className="list-card__city">Metuchen, NJ</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Full Stack Developer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Patrick Pierson"
                                src={require("assets/img/team/Patrick.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Patrick Pierson</h4>
                              <p className="list-card__city">Frederick, MD</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Infrastructure Lead</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Siddharth Raja"
                                src={require("assets/img/team/Siddharth.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Siddharth Raja</h4>
                              <p className="list-card__city">Navi Mumbai, India</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Back-End Developer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Steve Bonifas"
                                src={require("assets/img/team/Steve.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Steve Bonifas</h4>
                              <p className="list-card__city">Chicago, IL</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Business Analyst</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Suman Agrawal"
                                src={require("assets/img/team/Suman.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Suman Agrawal</h4>
                              <p className="list-card__city">Davie, FL</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Full Stack Developer</p>
                            </div>
                          </div>
                        </div>
                        <div className="list__section">
                          <h3>Design</h3>
                          <div className="list__cards">
                            <div className="list-card">
                              <img
                                alt="Jono Lee"
                                src={require("assets/img/team/Jono.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Jono Lee</h4>
                              <p className="list-card__city">San Francisco, CA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Product Designer &amp; Engineer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Lindsay George"
                                src={require("assets/img/team/Lindsay.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Lindsay George</h4>
                              <p className="list-card__city">New York, NY</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Product Designer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Tejal Shah"
                                src={require("assets/img/team/Tejal.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Tejal Shah</h4>
                              <p className="list-card__city">Orlando, FL</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">UX Designer</p>
                            </div>
                          </div>
                        </div>
                        <div className="list__section">
                          <h3>Marketing</h3>
                          <div className="list__cards">
                            <div className="list-card">
                              <img
                                alt="Tarryn Marcus"
                                src={require("assets/img/team/Tarryn.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Tarryn Marcus</h4>
                              <p className="list-card__city">Seattle, WA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Co-Founder</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Annika"
                                src={require("assets/img/team/Annika.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Annika Lin</h4>
                              <p className="list-card__city">United States</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Digital Marketer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Jaclyn"
                                src={require("assets/img/team/Jaclyn.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Jaclyn Thomas</h4>
                              <p className="list-card__city">Los Angeles, CA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">AV Producer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Katherine"
                                src={require("assets/img/team/Katherine.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Katherine Conaway</h4>
                              <p className="list-card__city">Fort Worth, TX</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Director of Content</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Lauren"
                                src={require("assets/img/team/Lauren.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Lauren Kohler</h4>
                              <p className="list-card__city">Seattle, WA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Video Editor</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Makya"
                                src={require("assets/img/team/Makya.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Makya McBee</h4>
                              <p className="list-card__city">Los Angeles, CA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Video Script Writer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Mike"
                                src={require("assets/img/team/Mike.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Mike Lovett</h4>
                              <p className="list-card__city">Somerville, MA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Copywriter</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Shachi"
                                src={require("assets/img/team/Shachi.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Shachi Arkatkar</h4>
                              <p className="list-card__city">Pune, India</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Digital Marketer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Staveta"
                                src={require("assets/img/team/Staveta.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Staveta Parashar</h4>
                              <p className="list-card__city">Delhi, India</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Public Relations</p>
                            </div>
                          </div>
                        </div>
                        <div className="list__section">
                          <h3>Analysis</h3>
                          <div className="list__cards">
                            <div className="list-card">
                              <img
                                alt="Amanda"
                                src={require("assets/img/team/Amanda.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Amanda Zhang</h4>
                              <p className="list-card__city">New Haven, CT</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Data Analyst</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Jaclyn Xiao"
                                src={require("assets/img/team/Jaclyn_Xiao.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Jaclyn Xiao</h4>
                              <p className="list-card__city">Durham, NC</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Data Analyst</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Jaclyn"
                                src={require("assets/img/team/Jaclyn.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Kasey Alderete</h4>
                              <p className="list-card__city">United States</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Product Management</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Robert"
                                src={require("assets/img/team/Robert.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Robert Güth</h4>
                              <p className="list-card__city">Germany</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Post-Doctoral Research Fellow</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Shwetha"
                                src={require("assets/img/team/Shwetha.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Shwetha Hariharan</h4>
                              <p className="list-card__city">New York, NY</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Analyst &amp; Operations Manager</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Makya"
                                src={require("assets/img/team/Makya.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Makya McBee</h4>
                              <p className="list-card__city">Los Angeles, CA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Video Script Writer</p>
                            </div>
                            <div className="list-card">
                              <img
                                alt="Yashi"
                                src={require("assets/img/team/Yashi.png")}
                                className="list-card__avatar"
                              />
                              <h4 className="list-card__name">Yashi Sanghvi</h4>
                              <p className="list-card__city">Johns Creek, GA</p>
                              <div className="list-card__hr"></div>
                              <p className="list-card__role">Data Analyst</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </StyledTeam>
                <NavFooter/>
            </DocumentMeta>
        );
    }
}

export default TeamPage;
