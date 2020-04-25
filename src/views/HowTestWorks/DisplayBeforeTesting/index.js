import React from 'react';
import { TextLink } from '../sharedStyles';
import { displaySubHeading } from '../DisplaySubHeading'

export const displayBeforeTesting = () => {
  const subHeadingContent = {
    title: 'Before Testing',
    sections: [
      {
        title: 'Who should get tested?',
        content: [
          <p>
            Your first step should be to{' '}
            <TextLink
              href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html"
              target="_blank"
            >
              ensure you qualify for a COVID-19 test
            </TextLink>
            .
          </p>,
          <p>
            Many testing centers require a doctor screening and an appointment
            before arrival. Some are limited to certain groups of the population
            (like people over 65) or people exhibiting certain symptoms (like a
            fever).
          </p>,
        ],
      },
      {
        title: 'Where are COVID-19 testing centers?',
        content: [
          <p>
            Visit our database to find your nearest COVID-19 testing center.
            Just search your zip code and you’ll see a list of local testing
            sites with details and general requirements for each site.', 'Call
            or check the center’s website to make sure you meet their
            requirements, such as being pre-screened by a health clinician or
            scheduling an appointment.
          </p>,
        ],
      },
      {
        title: 'How do I prepare for my test?',
        content: [
          <p>
            If you meet the testing center’s requirements, bring your photo ID,
            your insurance card, and a pen with you.
          </p>,
          <p>
            Some sites may ask people to refrain from taking fever-reducing
            medications or eating before the test as well as limiting the number
            of people in the vehicle with you.
          </p>,
        ],
      },
      {
        title: 'Do I have to pay for a COVID-19 test?',
        content: [
          <p>No. Insurance companies are waiving fees for COVID-19 testing.</p>,
          <p>
            Thanks to the{' '}
            <TextLink
              href="https://appropriations.house.gov/sites/democrats.appropriations.house.gov/files/Families%20First%20summary.pdf"
              target="_blank"
            >
              Families First Coronavirus Response Act
            </TextLink>
            , states can expand Medicaid coverage for uninsured individuals so
            that they may receive free COVID-19 diagnostics and testing. If you
            are uninsured, it’s important to know that the legislation does not
            extend to the coverage of COVID-19 treatment. Check to see if your
            state has expanded or opened special enrollment periods for health
            insurance.
          </p>,
        ],
      },
    ],
  };
  return displaySubHeading(subHeadingContent);
};

