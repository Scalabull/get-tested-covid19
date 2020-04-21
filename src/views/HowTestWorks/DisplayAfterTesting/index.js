import React from 'react';
import { displaySubHeading } from '../DisplaySubHeading'
import { TextLink } from '../sharedStyles'

export const displayAfterTesting = () => {
  const subHeadingContent = {
    title: 'After Testing',
    sections: [
      {
        title: 'When will I get my test results?',
        content: [
          <p>
            Currently, lab testing is not performed at most drive-thru sites.
            Though, this may change depending on{' '}
            <TextLink
              href="https://www.bloomberg.com/news/articles/2020-03-27/abbott-launches-5-minute-covid-19-test-for-use-almost-anywhere"
              target="_blank"
            >
              {' '}
              new testing technology becoming available.
            </TextLink>{' '}
            As it stands now, your sample(s) will then be sent to a lab for
            testing. Testing turnaround times are continuing to improve after
            the CDC improved their testing kit and the FDA approved large
            commercial labs to begin testing.
          </p>,
          <p>
            Including transit times, your test results should ideally be
            available within 24 to 48 hours. However, depending on the lab’s
            capacity, it may take up to a week to get your results back. Your
            testing site will have instructions on how to access your test
            results.
          </p>,
        ],
      },
      {
        title: 'What happens if your COVID-19 test comes back positive?',
        content: [
          <p>
            Follow{' '}
            <TextLink
              href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/index.html"
              target="_blank"
            >
              the CDC's guidelines
            </TextLink>{' '}
            for actions to take if you are sick or tested positive for COVID-19.
            This will help you manage your health and prevent the spread of
            infection in your household and community.
          </p>,
          <p>
            The primary guidelines include entering self-isolation, covering
            your nose and mouth around others, and monitoring your symptoms.
            Consult your primary care doctor and the{' '}
            <TextLink
              href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"
              target="_blank"
            >
              CDC’s self-checker
            </TextLink>{' '}
            to determine if and when you should go to a hospital, if at all.
          </p>,
        ],
      },
      {
        title: 'What happens if your COVID-19 test comes back negative? ',
        content: [
          <p>
            That doesn’t put you in the clear. It means you probably were not
            infected at the time of the test. It could also mean it was very
            early in your infection and you could test positive if administered
            another test later.
          </p>,
          <p>
            If you test negative, it is important to continue practicing
            physical distancing, washing your hands frequently, disinfecting
            frequently used surfaces, and following the rest of the{' '}
            <TextLink
              href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html"
              target="_blank"
            >
              guidelines for preventing the spread of COVID-19
            </TextLink>{' '}
            and getting sick yourself.
          </p>,
        ],
      }
    ],
  };

  return displaySubHeading(subHeadingContent);
};
