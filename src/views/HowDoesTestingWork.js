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
import React from "react";

// reactstrap components
import {
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import Link from "components/Link/Link.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DocumentMeta from 'react-document-meta';

// index page sections
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Resources extends React.Component {
    state = {};

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }

    render() {
        const meta = {
            title: 'How Does COVID-19 Testing Process Work? | Get Tested COVID-19',
            description: 'Your quick guide on how the drive-thru and walk-in testing center process works for COVID-19 testing.',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'covid19, testing process, drive-thru testing, coronavirus'
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <DemoNavbar/>
                <main ref="main">
                    <div className="position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped pb-100">
                            <div className="shape shape-style-1 shape-default">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                            <Container className="py-lg-md d-flex">
                                <div className="col px-0">
                                    <Row>
                                        <Col lg="12">
                                            <h1 className="display-3 text-white mt-3">
                                                How Does COVID-19 Testing Work?
                                            </h1>
                                            <h2 className="display-4 text-white mt-3">
                                                12 Step Guide on the Drive-Thru and Walk-in Testing Centers Process
                                            </h2>

                                            <p className="text-white">
                                                <span>
                                                In the United States, the availability of COVID-19 testing varies. The number of sites differs by state, and the process can be different for individual sites. Many testing centers require a doctor screening and an appointment before arrival. Your first step in receiving a COVID-19 test should be to ensure you qualify for one. 
                                                </span>
                                            </p>

                                            <h4 className="text-white">
                                            1. Where do I go to get a COVID-19 test?
                                            </h4>
                                            <p className="text-white">
                                                <span>Visit </span>
                                                <Link href="https://get-tested-covid19.org">
                                                    <span>
                                                         Get Tested COVID-19
                                                    </span>
                                                </Link> 
                                                <span> to find your nearest COVID-19 testing center. Just search your zip code and you’ll see a list of local testing sites with details and any requirements for each site. </span>
                                            </p>

                                            <h4 className="text-white">
                                            2. What’s the COVID-19 testing process like and what is different between a drive-thru and walk-in testing centers?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                If you do qualify for a COVID-19 test, you will likely visit either a drive-thru or walk-in testing site. Drive-thru testing is the most common and proven to be a quick and safe procedure for both people receiving a test and the medical professionals administering them. The increased testing capacity (300 to 500 tests per day) of drive-thru centers also helps alleviate the strain on clinics, doctors’ offices, and especially hospitals. 
                                                </span>
                                            </p>

                                            <h4 className="text-white">
                                            3. Drive- testing process: 
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                    A drive-thru center allows you to remain in your vehicle as the test is performed. You’ll be asked to roll your window down, turn off your car, and present your photo ID and insurance card, if you have one, for a picture. When you reach the front of the line, a medical professional will approach your car and take your sample through the open window.
                                                </span>
                                            </p>


                                            <h4 className="text-white">
                                            4. Walk-in testing process: 
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                A walk-in testing site would require you to enter a facility at some point. These facilities typically include local clinics, doctors’ offices, or hospitals. If your testing site is a walk-in, </span><Link href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html"><span>follow CDC guidelines</span></Link><span> like social distancing and face-covering while around others. Here you may also be asked to present your license and insurance card if you have one. To find your nearest testing centers go to </span>
                                                <Link href="https://get-tested-covid19.org">
                                                    <span>
                                                         Get Tested COVID-19
                                                    </span>
                                                </Link>                                               
                                            </p>

                                            <h4 className="text-white">
                                            5. How do I prepare for getting a COVID-19 test?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                Before visiting a COVID-19 testing center, </span>
                                                <Link href="https://get-tested-covid19.org">
                                                    <span>
                                                         check online
                                                    </span>
                                                </Link> 
                                                <span> or call to make sure you meet their requirements. Many will ask if you have been pre-screened by a health clinician and require an appointment. Additionally, some sites are asking people seeking a test to refrain from taking fever-reducing medications or eating before the test and limiting the number of people in the vehicle with you. If you meet the testing center’s requirements, bring a photo ID, your insurance card, and a pen. 
                                                </span>
                                            </p>

                                            <h4 className="text-white">
                                            6. Do I have to pay for a COVID-19 test?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                No. Insurance companies are waiving fees for COVID-19 testing and thanks to the </span>
                                                <Link href="https://appropriations.house.gov/sites/democrats.appropriations.house.gov/files/Families%20First%20summary.pdf">
                                                    <span>
                                                         Families First Coronavirus Response Act
                                                    </span>
                                                </Link> 
                                                <span>, states can expand Medicaid coverage for uninsured individuals so that they may receive free COVID-19 diagnostics and testing. </span>
                                            </p>
                                            <p className="text-white">
                                                <span>
                                                If you are uninsured, it’s important to know that the legislation does not extend to the coverage of COVID-19 <i>treatment</i>. Again, check to see if your state has expanded or opened special enrollments periods for health insurance.
                                                </span>
                                            </p>

                                            <h4 className="text-white">
                                            7. What is a COVID-19 test?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                Many testing centers follow the </span>
                                                <Link href="https://www.cdc.gov/coronavirus/2019-ncov/lab/guidelines-clinical-specimens.html">
                                                    <span>
                                                         CDC Guidelines
                                                    </span>
                                                </Link> 
                                                <span> and administer a </span>
                                                <Link href="http://www.hss.gov.yk.ca/pdf/npswab.pdf">
                                                    <span>
                                                        nasopharyngeal test
                                                    </span>
                                                </Link> 
                                                <span>. This is a quick, painless test used to detect an ongoing respiratory infection, including in asymptomatic people. </span>
                                            </p>
                                            <p className="text-white">
                                                <span>
                                                Your healthcare provider will explain the procedure (like we are about to do) and ask you to cough or blow your nose away from them and then tilt your head back. They will then gently pass a flexible swab several centimeters along the floor of your nose, slowly rotating it to collect a secretion from your nasopharynx, which covers the roof of your mouth. 
                                                </span>
                                            </p>
                                            <p className="text-white">
                                                <span>
                                                While ultimately relatively painless, during a nasopharyngeal swab you may gag or feel a sense of pressure or discomfort, but it’s important to remain still. Afterward, your nose might even feel irritated or bleed slightly. A humidifier or warm shower can help ease those symptoms. 
                                                </span>
                                            </p>
                                            <p className="text-white">
                                                <span>
                                                If a testing center is unable to collect a nasopharyngeal culture, the CDC outlines a few alternatives. 
                                                </span>
                                            </p>
                                            <p className="text-white">
                                                <span>
                                                    <ul>
                                                        <li>
                                                            <strong>An oral throat swab (or oropharyngeal specimen collection.) </strong>
                                                            <br />
                                                            <span>Similar to a nasopharyngeal test, this test takes a sample using a swab. In this case, a collection is taken directly from your posterior pharynx, which is at the top of your throat. Nasopharynx cultures are preferred because, on average, the nasopharynx has a higher count of a virus’s RNA and can provide a more accurate sample. </span>
                                                        </li>

                                                        <li>
                                                            <strong>A nasal mid-turbinate swab</strong>
                                                            <br />
                                                            <span>If you are symptomatic (fever, dry cough, or shortness of breath), a nasal mid-turbinate swab may be administered. In this test, a swab is gently inserted into your nose but stops short of the nasopharynx.</span>
                                                        </li>
                                                        <li>
                                                            <strong>An anterior nares specimen collection</strong>
                                                            <br />
                                                            <span>Another test that may be administered if you are symptomatic is an anterior nares collection. This test simply requires a swab of each nostril.</span>
                                                        </li>
                                                    </ul>
                                                </span>
                                                <span>
                                                <strong>Note:</strong> The FDA has recently approved a test for coronavirus antibodies. With a finger prick of blood, doctors would be able to determine if a patient has ever been exposed to COVID-19 and has since developed some level of immunity. Antibody tests are currently used in a handful of countries. 
                                                </span>
                                            </p>
                                            <p className="text-white">
                                                <span>
                                                When available, this test should give scientists a more accurate understanding of how many people are infected as well as the virus’s death rate. An antibody test is not the preferred test to determine if you have COVID-19 because the body doesn’t immediately produce them and may not until after your body has recovered from the illness. 
                                                </span>
                                            </p>

                                            <h4 className="text-white">
                                            8. How long does a COVID-19 test take?
                                            </h4>
                                            <p className="text-white">
                                                <span>For a COVID-19 test, medical workers will collect one or two samples from you with a nasal or throat swab. This process only takes <strong>5-10 minutes.</strong> </span>
                                            </p>
                                            <p className="text-white">
                                                <span>While the collection process is relatively quick, be prepared for lengthy on-site wait times. This is especially likely if you live in a big city or your testing site doesn’t require scheduled appointments. Drive-thru testing sites will likely not have bathroom facilities so plan ahead for that, too. </span>
                                            </p>

                                            <h4 className="text-white">
                                            9. How are COVID-19 test results determined?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                Your COVID-19 testing sample will be sent to a lab and loaded into a standard reaction vial. Then it will be placed on a dish and mixed with a reagent, a cocktail of chemicals that helps the lab identify a virus’s RNA. That viral genome is then replicated thousands, millions, sometimes even billions of times to identify the possible presence of the virus. 
                                                </span>
                                            </p>

                                            <h4 className="text-white">
                                            10. When will I get my test results?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                Currently, lab testing is not performed at most drive-thru sites. Though, this may change depending on </span>
                                                <Link href="https://www.bloomberg.com/news/articles/2020-03-27/abbott-launches-5-minute-covid-19-test-for-use-almost-anywhere">
                                                    <span>
                                                        new testing technology becoming available
                                                    </span>
                                                </Link> 
                                                <span>. As it stands now, your sample(s) will then be sent to a lab for testing. Including transit times, your test results should ideally be available within 24 to 48 hours. However, depending on the lab’s capacity, it may take up to a week to get your results back. Your testing site will have instructions on how to access your test results. </span>
                                            </p>
                                            <p className="text-white">
                                                <span>Testing turnaround times are continuing to improve after the CDC improved their testing kit and the FDA approved large commercial labs to begin testing.</span>
                                            </p>

                                            <h4 className="text-white">
                                            11. What happens if your COVID-19 test comes back positive?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                Follow the </span>
                                                <Link href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/index.html">
                                                    <span>
                                                        CDC's Guidelines
                                                    </span>
                                                </Link> 
                                                <span> for actions to take if you are sick or tested positive for COVID-19. This will help you manage your health and prevent the spread of infection in your household and community. 
                                                </span>
                                            </p>
                                            <p className="text-white"> 
                                                <span> The primary guidelines include entering self-isolation, covering your nose and mouth around others, and monitoring your symptoms. Consult your primary care doctor and the </span>
                                                <Link href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">
                                                    <span>
                                                        CDC’s self-checker
                                                    </span>
                                                </Link> 
                                                <span> to determine if and when you should go to a hospital, if at all. 


                                                </span>
                                            </p>

                                            <h4 className="text-white">
                                            12. What happens if your COVID-19 test comes back negative?
                                            </h4>
                                            <p className="text-white">
                                                <span>
                                                That doesn’t put you in the clear. It means you probably were not infected at the time of the test. It could also mean it was very early in your infection and you could test positive if administered another test later. 
                                                </span>
                                            </p>
                                            <p className="text-white"> 
                                                <span>
                                                If you test negative, it is important to continue practicing physical distancing, washing your hands frequently, disinfecting frequently used surfaces, and following the rest of the </span>
                                                <Link href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html">
                                                    <span>
                                                        guidelines for preventing the spread of COVID-19
                                                    </span>
                                                </Link> 
                                                <span> and getting sick yourself. </span>
                                            </p>
                                            <p className="text-white">
                                                <Link href="https://www.healthaffairs.org/do/10.1377/hblog20200406.55720/full/">
                                                    <span>
                                                        Free, widespread testing will play an enormous role in the ability to contain COVID-19
                                                    </span>
                                                </Link> 
                                                <span>. South Korea stands a benchmark for </span>
                                                <Link href="https://www.visualcapitalist.com/infection-trajectory-flattening-the-covid19-curve/">
                                                    <span>
                                                        testing capacity and thus their ability to limit infection rates
                                                    </span>
                                                </Link> 
                                                <span>. Until that is available in the US, it’s important to stay informed about what services are available to you. 
                                                </span>
                                            </p>
                                            <p className="text-white">
                                                <span>
                                                    That’s why we created </span>
                                                <Link href="https://get-tested-covid19.org">
                                                    <span>
                                                         Get Tested COVID-19
                                                    </span>
                                                </Link> 
                                                <span>. We want it to be as simple as possible to find your nearest testing site and have all of the information to get tested safely. Just enter your Zipcode to find the testing centers nearest you and their requirements for testing.
                                                </span>
                                            </p>

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

export default Resources;
