
import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import DocumentMeta from 'react-document-meta';
import NavHeader from '../shared/NavHeader.js';
import NavFooter from '../shared/NavFooter.js';

class Resources extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    const meta = {
      title: 'Resources from CDC & WHO | Get Tested COVID-19',
      description: 'Follow these COVID-19 guidelines from the CDC and WHO.',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'COVID-19, testing centers, novel coronavirus'
        }
      }
    };

    return (
      <DocumentMeta {...meta}>
        <NavHeader />
        <main ref="main">
            <section className="section section-lg section-shaped mt-5 mb-5">
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="8">
                      <h1 className="display-4  mt-3">
                        Resources
                      </h1>
                      <p>   
                      The CDC expects that widespread transmission of COVID-19 in the United States will occur. In the coming months, most of the U.S. population will be exposed to this virus. You should continue to practice all the protective measures recommended to keep yourself and others free from illness. 
                      </p>
                      <p>
                      If you develop emergency warning signs for COVID-19, get medical attention immediately.

                      </p>
<h4 className="pt-4">
What are the <a  href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">common symptoms</a> of COVID-19?
</h4>
<p>
Reported illnesses have ranged from mild symptoms to severe illness and death for confirmed coronavirus disease 2019 (COVID-19) cases. These symptoms may appear 2-14 days after exposure (based on the incubation period of MERS-CoV viruses). Common symptoms:
</p>
<ul >
  <li>Fever</li>
  <li>Dry Cough</li>
  <li>Shortness of Breath</li>
</ul>

<h4 className="pt-4">
Who should be tested?
</h4>
<p>
You can use the <a  href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html">“self-checker” on the CDC testing site</a> to help you make decisions about seeking appropriate medical care. 
</p>

<h4 className="pt-4">
Before you go to a testing site, please consider the following information about seeking care or testing:
</h4>
<ul >
  <li>Most people have mild illness and are able to recover at home.</li>
  <li>There is no treatment specifically approved for this virus.</li>
  <li>Testing results may be helpful to inform decision-making about who you interact with.</li>
  <li>CDC has guidance for who should be tested, but decisions about testing are at the discretion of state and local health departments and/or individual clinicians.</li>
</ul>

<h4 className="pt-4">
Please consult these official resources for information:
</h4>
<ul>
  <li>CDC <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">https://www.cdc.gov/coronavirus/2019-ncov/index.html</a> </li>
  <li>WHO <a href="https://www.who.int/health-topics/coronavirus">https://www.who.int/health-topics/coronavirus</a> </li>
  <li>USA.gov <a href="https://www.usa.gov/coronavirus">https://www.usa.gov/coronavirus</a> </li>
  <li>State Government Health Sites <a href="https://www.usa.gov/state-health">https://www.usa.gov/state-health</a> </li>
</ul>

                     
                      
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
        </main>
        <NavFooter />
      </DocumentMeta>
    );
  }
}

export default Resources;
