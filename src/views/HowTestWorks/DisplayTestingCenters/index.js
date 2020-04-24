import React from 'react';
import { TextLink } from '../sharedStyles';
import { displaySubHeading } from '../DisplaySubHeading'

export const displayTestingCenters = () => {
  const subHeadingContent = {
    title: 'Testing Centers',
    sections: [
      {
        title: 'Where are COVID-19 tests administered?',
        content: [
          <p>
            If you do qualify for a COVID- 19 test, you will likely visit either
            a drive - thru or in -facility testing site.Drive - thru testing is
            the most common and proven to be a quick and safe procedure for both
            people receiving a test and the medical professionals administering
            them.
          </p>,
          <p>
            The increased testing capacity (300 to 500 tests per day) of
            drive-thru centers also helps alleviate the strain on clinics,
            doctors’ offices, and especially hospitals.
          </p>,
        ],
      },
      {
        title: 'What is the drive-thru testing process?',
        content: [
          <p>
            A drive-thru center allows you to remain in your vehicle as the test
            is performed. You’ll be asked to roll your window down, turn off
            your car, and present your photo ID and insurance card, if you have
            one, for a picture. When you reach the front of the line, a medical
            professional will approach your car and take your sample through the
            open window.
          </p>,
        ],
      },
      {
        title: 'What is the in-facility testing process?',
        content: [
          <p>
            An in-facility testing site would require you to a local clinic,
            doctor’s office, hospital, or other location. If your testing site
            is a facility,{' '}
            <TextLink
              href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html"
              target="_blank"
            >
              follow CDC guidelines{' '}
            </TextLink>{' '}
            like social distancing and face-covering while around others. You
            will likely be asked to present your license and insurance card if
            you have one.
          </p>,
        ],
      },
    ],
  };

  return displaySubHeading(subHeadingContent);
};
