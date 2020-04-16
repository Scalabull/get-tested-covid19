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
import React from 'react'

// reactstrap components
import { Container, Row, Col } from 'reactstrap'

// core components
import Link from 'components/Link/Link.js'
import DemoNavbar from 'components/Navbars/DemoNavbar.js'
import DocumentMeta from 'react-document-meta'

// index page sections
import SimpleFooter from 'components/Footers/SimpleFooter.js'

class Resources extends React.Component {
  state = {}

  componentDidMount() {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    this.refs.main.scrollTop = 0
  }

  render() {
    const meta = {
      title: 'When Should You Get Tested for COVID-19? | Get Tested COVID-19',
      description:
        'All the information you need to decide if and when you should get tested for COVID-19 including symptom and prescreening requirements.',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'COVID-19, testing centers, novel coronavirus',
        },
      },
    }

    return (
      <DocumentMeta {...meta}>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-100">
              <div className="shape shape-style-1 shape-default">
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
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="12">
                      <h1 className="display-3 text-white mt-3">
                        When and Why You Should Get Tested for COVID-19?
                      </h1>
                      <p className="text-white">
                        <span>
                          Not everyone needs to be tested for COVID-19. Many
                          have a mild illness and will be able to recover at
                          home by following{' '}
                        </span>
                        <Link href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html">
                          <span>guidelines established by the CDC</span>
                        </Link>
                        <span>
                          . While there is no treatment specific for COVID-19,
                          test results can help you inform your own
                          decision-making about who you come in contact with.
                        </span>
                      </p>
                      <h4 className="text-white">
                        Should you get tested for COVID-19?
                      </h4>
                      <p className="text-white">
                        <span>A great place to start is using </span>
                        <Link href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">
                          <span>the CDC’s self-checker</span>
                        </Link>
                        <span>
                          {' '}
                          to evaluate your symptoms. This valuable resource will
                          provide direct information on the type of care you
                          need based on symptoms and severity. The key symptoms
                          of COVID-19 include persistent fever, a dry cough, and
                          shortness of breath. If these symptoms persist please
                          contact your local health provider. They can also help
                          determine if a test is necessary and information about
                          where to get one. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          Outside of confirming if your symptoms match COVID-19
                          many testing sites require you have a doctor screening
                          prior to receiving a test. This is largely done
                          through{' '}
                        </span>
                        <Link href="https://chironhealth.com/telemedicine/what-is-telemedicine/">
                          <span>telemedicine</span>
                        </Link>
                        <span>
                          {' '}
                          which allows a patient to receive an evaluation via
                          video or audio instead of an in-person visit.
                          Ultimately, decisions about testing are at the
                          discretion of your state and local health departments
                          or your individual clinician. To find out the
                          locations and requirements of specific testing centers
                          near you, go{' '}
                        </span>
                        <Link href="https://get-tested-covid19.org/test-site-search">
                          <span>here</span>
                        </Link>
                        <span>. </span>
                      </p>

                      <h4 className="text-white">
                        Why should you get tested for COVID-19?
                      </h4>
                      <p className="text-white">
                        <span>
                          If you are recommended or are able to be tested, the
                          results can help inform your decision making. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          If you test positive, you should follow the{' '}
                        </span>
                        <Link href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">
                          <span>CDC guidelines for managing your health</span>
                        </Link>
                        <span>
                          {' '}
                          and stopping the spread of infection in your household
                          or community. The primary guidelines include entering
                          self-isolation, covering your nose and mouth around
                          others, and monitoring your symptoms. Consult your
                          primary care doctor and the{' '}
                        </span>
                        <Link href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">
                          <span>CDC’s self-checker</span>
                        </Link>
                        <span>
                          {' '}
                          to determine if and when you should go to a hospital,
                          if at all. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          If your test is negative, it means the virus was
                          either not present when the test was administered or
                          was very early in its development. You should continue
                          to{' '}
                        </span>
                        <Link href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html">
                          <span>follow CDC guidelines</span>
                        </Link>
                        <span>
                          {' '}
                          for preventing the spread of infection like physical
                          distancing and washing your hands frequently. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          Another reason to continue following CDC guidelines
                          despite a negative COVID-19 test is{' '}
                        </span>
                        <Link href="https://www.sciencedaily.com/releases/2020/04/200409144805.htm">
                          <span>
                            the possibility of a false-negative result
                          </span>
                        </Link>
                        <span>
                          . In any medical procedure, it’s possible a test is
                          not conclusive or incorrectly performed. Normally,
                          patients can be retested easily to determine
                          concretely if it is a negative test, but with a lack
                          of resources that is proving difficult. Additionally,
                          healthcare providers still lack the information they
                          need to fully grasp the COVID-19 test results and when
                          in the course of infection they should be testing. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          Currently, most tests are being reserved for high-risk
                          cases, those with severe symptoms including
                          temperatures above 100 degrees, and health care
                          workers. Age and pre-existing health conditions are
                          other prominent risk factors being prioritized. As
                          testing becomes more widely available, asymptomatic
                          people may also be recommended to get tested in order
                          to help control the spread of infection. 
                        </span>
                      </p>

                      <h4 className="text-white">
                        What if you think already had COVID-19, but don’t know
                        for sure?
                      </h4>
                      <p className="text-white">
                        <span>
                          The FDA has recently approved a test for coronavirus
                          antibodies. With a finger prick of blood, doctors
                          would be able to determine if a patient has ever been
                          exposed to COVID-19 and has since developed some level
                          of immunity. Antibody tests are currently used in a
                          handful of countries. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          When available, this test should give scientists a
                          more accurate understanding of how many people are
                          infected as well as the virus’s death rate. An
                          antibody test is not the preferred test to determine
                          if you have COVID-19 because the body doesn’t
                          immediately produce them and may not until after your
                          body has recovered from the illness. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          Free, widespread testing will play an enormous role in
                          the ability to contain COVID-19. Until that is
                          available in the US, it’s important to stay informed
                          about what services are available to you. 
                        </span>
                      </p>
                      <p></p>
                      <p className="text-white">
                        <span>
                          That’s why we created Get Tested COVID-19. We want it
                          to be as simple as possible to find your nearest
                          testing site and have all of the information to get
                          tested safely. Visit{' '}
                        </span>
                        <Link href="http://get-tested-covid19.org/">
                          <span>Get Tested COVID-19</span>
                        </Link>
                        <span>
                          {' '}
                          to find COVID-19 testing centers near you and
                          additional resources.
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
    )
  }
}

export default Resources
