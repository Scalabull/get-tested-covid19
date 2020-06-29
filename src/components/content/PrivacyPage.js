import React from 'react';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import DocumentMeta from 'react-document-meta';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';

class PrivacyPage extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    render() {
        const meta = {
            title: 'Privacy Policy| Get Tested COVID-19',
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
                                        <h1 className='display-5 mb-2 mt-3'>
                                            Get Tested COVID-19 Privacy Statement
                                        </h1>
                                        <p className='lead mb-5'>
                                            Effective Date: 05/01/2020
                                        </p>
                                        <h2>Collecting Information</h2>
                                        <h3>Personal information</h3>
                                        <p>The Get Tested COVID-19 website collects and maintains personal information provided by its users, including their email addresses. The amount of information provided is completely voluntary; however, providing less information might limit a user’s ability to access all of the site’s features.</p>
                                        <h3>Usage and analytics data</h3>
                                        <p>The Get Tested COVID-19 website collects usage information in order to assess how users access and utilize the site. This data is valuable to the organization for various internal purposes, including troubleshooting and improving the site’s functionality. This may include the user’s Internet service provider, type of web browser or operating system, IP address, viewed pages, time and duration of site visits, crash logs, and other information relating to site usage.</p>
                                        <h3>Cookies</h3>
                                        <p>This website uses cookies in order to enhance the site’s functionality. Most web browsers are initially set up to accept cookies. You can reset your web browser to refuse all cookies or to indicate when a cookie is being sent. Please note, however, that certain features of the site might not function if you delete or disable cookies. THE SITE’S COOKIES DO NOT AND CANNOT INFILTRATE A USER’S HARD DRIVE TO COLLECT ANY INFORMATION STORED ON THE HARD DRIVE.</p>
                                        <h3>Commitment to Children’s Privacy</h3>
                                        <p className='mb-5'>Get Tested COVID-19 does not knowingly collect information from individuals under the age of 13. In the event that we learn that we have collected information from a child under the age of 13, we will delete that information.</p>
                                        <h2>Utilizing User Information</h2>
                                        <h3>General announcements</h3>
                                        <p>The website may use personal information for periodic announcements related to COVID-19 testing to users. These can include notifications, updates regarding the organization or the site, or marketing communications.</p>
                                        <h3>Third party service providers</h3>
                                        <p className='mb-5'>Get Tested COVID-19 may need to use personal user data in connection with website maintenance, upgrades, new releases, or analytics data review or compilation. Get Tested COVID-19 will be required to share user data with any third-party service providers that it might engage to assist in these efforts. Similarly, we may have to share user information in connection with third-party marketing or advertising services. However, Get Tested COVID-19 will be responsible for ensuring that these service providers employ adequate security measures with respect to user data.</p>
                                        <h2>Sharing Data</h2>
                                        <p>As a general policy, we use personal information and message data for internal purposes only. We do not sell or rent information about you. We will not disclose personal information or message data to third parties without your consent, except as explained in this Privacy Policy.</p>
                                        <h3>Sharing with affiliates or acquirers</h3>
                                        <p>Get Tested COVID-19 must be permitted to share user data with its affiliated entities, including parent companies and subsidiaries. Furthermore, if the organization participates in a merger, stock purchase, asset purchase, or other acquisition, it will be required to share user information with the purchaser or surviving entity.</p>
                                        <h3>Compliance with laws</h3>
                                        <p className='mb-5'>Get Tested COVID-19 cooperates with government and law enforcement officials to enforce and comply with the law. We may therefore disclose personal information, usage data, message data, and any other information about you, if we deem that it is reasonably necessary to: (a) satisfy any applicable law, regulation, legal process (such as a subpoena or court order), or enforceable governmental request; (b) enforce the Terms of Use, including investigation of potential violations thereof; (c) detect, prevent, or otherwise address fraud, security or technical issues; or (d) protect against harm to the rights, property or safety of the Company, its users or the public, as required or permitted by law.</p>
                                        <h2>Security</h2>
                                        <p className='mb-5'>Get Tested COVID-19 will use necessary measures to protect the security of all user data. However, it is impossible for the organization to completely guarantee that user data will be immune from malicious attack or compromise; as such, the users should understand that their transmission of personal data is always at their own risk.</p>
                                        <h2>Storage and Maintenance of User Data in the United States</h2>
                                        <p className='mb-5'>As all Get Tested COVID-19 data is collected and stored in the United States, user information will be subject to the laws of the United States of America, regardless of the country from which the data originates.</p>
                                        <h2>Updating User Information</h2>
                                        <p className='mb-5'>Users are permitted to correct, update, or change their personal information, or adjust or cease the frequency with which they receive Get Tested COVID-19 communications. Users also have the ability to disable their account, in accordance with the Terms of Use. All requests to perform the foregoing should be sent to <a href="mailto:info@get-tested-covid19.org">info@get-tested-covid19.org</a>.</p>
                                        <h2>Changes to the Privacy Policy</h2>
                                        <p className='mb-5'>The organization will make changes to its privacy policy from time-to-time and users should periodically revisit the policy for any updates. Users who continue to interact with the site following a revision of the company’s privacy policy will automatically be subject to the new terms.</p>
                                        <h2>Safekeeping Data</h2>
                                        <p>All users should carefully protect the personal information submitted on the site including their passwords, usernames, location, images, and videos — so that third parties can’t manipulate their accounts or assume their identities. </p>
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

export default PrivacyPage;
