import React from 'react';
import { TextLink } from '../sharedStyles';
import { displaySubHeading } from '../DisplaySubHeading'

export const displayHowTestingWorks = () => {
  const subHeadingContent = {
    title: 'How Testing Works',
    sections: [
      {
        title: 'What is a COVID-19 test?',
        content: [
          <p>
            Many testing centers follow{' '}
            <TextLink
              href="https://www.cdc.gov/coronavirus/2019-ncov/lab/guidelines-clinical-specimens.html"
              target="_blank"
            >
              the CDC guidelines
            </TextLink>{' '}
            and administer a{' '}
            <TextLink
              href="http://www.hss.gov.yk.ca/pdf/npswab.pdf"
              target="_blank"
            >
              nasopharyngeal test
            </TextLink>
            . This is a quick, painless test used to detect an ongoing
            respiratory infection, including in asymptomatic people
          </p>,
          <p>
            Here’s how it generally works:
            <ul>
              <li>
                They’ll ask you to cough or blow your nose away from them and
                then tilt your head back.
              </li>
              <li>
                They will then gently pass a flexible swab several centimeters
                along the floor of your nose, slowly rotating it to collect a
                secretion from your nasopharynx, which covers the roof of your
                mouth.
              </li>
              <li>
                They will collect one or two samples from you with a nasal or
                throat swab. This process only takes 5-10 minutes.
              </li>
            </ul>
          </p>,
          <p>
            While ultimately relatively painless, during a nasopharyngeal swab
            you may gag or feel a sense of pressure or discomfort, but it’s
            important to remain still. Afterward, your nose might even feel
            irritated or bleed slightly. A humidifier or warm shower can help
            ease those symptoms.
          </p>,
          <div>
            <p>
              If a testing center is unable to collect a nasopharyngeal culture,
              the CDC outlines a few alternative test options:
            </p>
            <ul>
              <p>
                <li>
                  An oral throat swab (or oropharyngeal specimen collection)
                  Similar to a nasopharyngeal test, this test takes a sample
                  using a swab. In this case, a collection is taken directly
                  from your posterior pharynx, which is at the top of your
                  throat. Nasopharynx cultures are preferred because, on
                  average, the nasopharynx has a higher count of a virus’s RNA
                  and can provide a more accurate sample.
                </li>
                <li>
                  A nasal mid-turbinate swab If you are symptomatic (fever, dry
                  cough, or shortness of breath), a nasal mid-turbinate swab may
                  be administered. In this test, a swab is gently inserted into
                  your nose but stops short of the nasopharynx.
                </li>
                <li>
                  An anterior nares specimen collection Another test that may be
                  administered if you are symptomatic is an anterior nares
                  collection. This test simply requires a swab of each nostril.
                </li>
              </p>
            </ul>
            <p>
              Note: The FDA has recently approved a test for coronavirus
              antibodies. With a finger prick of blood, doctors would be able to
              determine if a patient has ever been exposed to COVID-19 and has
              since developed some level of immunity. Antibody tests are
              currently used in a handful of countries.
            </p>
            <p>
              When available, this test should give scientists a more accurate
              understanding of how many people are infected as well as the
              virus’s death rate. An antibody test is not the preferred test to
              determine if you have COVID-19 because the body doesn’t
              immediately produce them and may not until after your body has
              recovered from the illness.
            </p>
          </div>,
        ],
      },
      {
        title: 'How long does a COVID-19 test take?',
        content: [
          <p>
            They will collect one or two samples from you with a nasal or throat
            swab. This process only takes 5-10 minutes.
          </p>,
          <p>
            While the collection process is relatively quick, be prepared for
            lengthy on-site wait times. This is especially likely if you live in
            a big city or your testing site doesn’t require scheduled
            appointments. Drive-thru testing sites will likely not have bathroom
            facilities so plan ahead for that, too.
          </p>,
        ],
      },
      {
        title: 'How are COVID-19 test results determined?',
        content: [
          <p>
            Your COVID-19 testing sample will be sent to a lab and loaded into a
            standard reaction vial. Then it will be placed on a dish and mixed
            with a reagent, a cocktail of chemicals that helps the lab identify
            a virus’s RNA. That viral genome is then replicated thousands,
            millions, sometimes even billions of times to identify the possible
            presence of the virus.
          </p>,
        ],
      },
    ],
  };

  return displaySubHeading(subHeadingContent);
};
