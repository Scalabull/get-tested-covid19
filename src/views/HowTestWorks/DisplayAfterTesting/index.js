import React from 'react';
import Link from 'components/Link/Link.js';
import { displaySubHeading } from '../DisplaySubHeading'


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
            <Link
              href="https://www.bloomberg.com/news/articles/2020-03-27/abbott-launches-5-minute-covid-19-test-for-use-almost-anywhere"
              target="_blank"
            >
              {' '}
              new testing technology becoming available.
            </Link>{' '}
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
            <Link
              href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/index.html"
              target="_blank"
            >
              the CDC's guidelines
            </Link>{' '}
            for actions to take if you are sick or tested positive for COVID-19.
            This will help you manage your health and prevent the spread of
            infection in your household and community.
          </p>,
          <p>
            The primary guidelines include entering self-isolation, covering
            your nose and mouth around others, and monitoring your symptoms.
            Consult your primary care doctor and the{' '}
            <Link
              href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"
              target="_blank"
            >
              CDC’s self-checker
            </Link>{' '}
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
            <Link
              href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html"
              target="_blank"
            >
              guidelines for preventing the spread of COVID-19
            </Link>{' '}
            and getting sick yourself.
          </p>,
        ],
      },
      {
        title: 'Why is testing important? ',
        content: [
          <p>
            <Link
              href="https://www.healthaffairs.org/do/10.1377/hblog20200406.55720/full/"
              target="_blank"
            >
              Free, widespread testing will play an enormous role in the ability
              to contain COVID-19
            </Link>
            . South Korea stands a benchmark for{' '}
            <Link
              href="https://www.visualcapitalist.com/infection-trajectory-flattening-the-covid19-curve/"
              target="_blank"
            >
              testing capacity and thus their ability to limit infection rates
            </Link>
            . Until widespread testing is available in the US, it’s important to
            stay informed about what services are available to you.
          </p>,
          <p>
            That’s why we created{' '}
            <Link href="http://get-tested-covid19.org/" target="_blank">
              Get Tested COVID-19
            </Link>
            . We want it to be as simple as possible to find your nearest
            testing site and have all of the information to get tested safely.
            As more testing centers open and can facilitate more people being
            tested (with fewer requirements), we want to help support
            communities getting tested across the US.
          </p>,
          <div>
            <p>Sources</p>
            <ul>
              <li>
                <Link
                  href="https://medlineplus.gov/ency/article/003747.htm"
                  target="_blank"
                >
                  https://medlineplus.gov/ency/article/003747.htm
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.cdc.gov/coronavirus/2019-ncov/lab/guidelines-clinical-specimens.html"
                  href="https://www.cdc.gov/coronavirus/2019-ncov/lab/guidelines-clinical-specimens.html"
                  target="_blank"
                >
                  https://www.cdc.gov/coronavirus/2019-ncov/lab/guidelines-clinical-specimens.html
                </Link>
              </li>
              <li>
                <Link
                  key="http://www.hss.gov.yk.ca/pdf/npswab.pdf"
                  href="http://www.hss.gov.yk.ca/pdf/npswab.pdf"
                  target="_blank"
                >
                  http://www.hss.gov.yk.ca/pdf/npswab.pdf
                </Link>
              </li>
              <li>
                <Link
                  key="http://www.msdh.state.ms.us/msdhsite/index.cfm/14,8501,420,694,pdf/COVID-19_Specimen_Collection.pdf"
                  href="http://www.msdh.state.ms.us/msdhsite/index.cfm/14,8501,420,694,pdf/COVID-19_Specimen_Collection.pdf"
                  target="_blank"
                >
                  http://www.msdh.state.ms.us/msdhsite/index.cfm/14,8501,420,694,pdf/COVID-19_Specimen_Collection.pdf
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.healthline.com/health/nasopharyngeal-culture#procedure"
                  href="https://www.healthline.com/health/nasopharyngeal-culture#procedure"
                  target="_blank"
                >
                  https://www.healthline.com/health/nasopharyngeal-culture#procedure
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.cdc.gov/urdo/downloads/SpecCollectionGuidelines.pdf"
                  href="https://www.cdc.gov/urdo/downloads/SpecCollectionGuidelines.pdf"
                  target="_blank"
                >
                  https://www.cdc.gov/urdo/downloads/SpecCollectionGuidelines.pdf
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html"
                  href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html"
                  target="_blank"
                >
                  https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.npr.org/sections/health-shots/2020/03/28/822869504/why-it-takes-so-long-to-get-most-covid-19-test-results"
                  href="https://www.npr.org/sections/health-shots/2020/03/28/822869504/why-it-takes-so-long-to-get-most-covid-19-test-results"
                  target="_blank"
                >
                  https://www.npr.org/sections/health-shots/2020/03/28/822869504/why-it-takes-so-long-to-get-most-covid-19-test-results
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.fda.gov/medical-devices/emergency-situations-medical-devices/emergency-use-authorizations#covid19ivd"
                  href="https://www.fda.gov/medical-devices/emergency-situations-medical-devices/emergency-use-authorizations#covid19ivd"
                  target="_blank"
                >
                  https://www.fda.gov/medical-devices/emergency-situations-medical-devices/emergency-use-authorizations#covid19ivd
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.verywellhealth.com/turbinates-types-purpose-and-disorders-1192107"
                  href="https://www.verywellhealth.com/turbinates-types-purpose-and-disorders-1192107"
                  target="_blank"
                >
                  https://www.verywellhealth.com/turbinates-types-purpose-and-disorders-1192107
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.bloomberg.com/news/articles/2020-03-27/abbott-launches-5-minute-covid-19-test-for-use-almost-anywhere"
                  href="https://www.bloomberg.com/news/articles/2020-03-27/abbott-launches-5-minute-covid-19-test-for-use-almost-anywhere"
                  target="_blank"
                >
                  https://www.bloomberg.com/news/articles/2020-03-27/abbott-launches-5-minute-covid-19-test-for-use-almost-anywhere
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.kff.org/uninsured/fact-sheet/what-issues-will-uninsured-people-face-with-testing-and-treatment-for-covid-19"
                  href="https://www.kff.org/uninsured/fact-sheet/what-issues-will-uninsured-people-face-with-testing-and-treatment-for-covid-19"
                  target="_blank"
                >
                  https://www.kff.org/uninsured/fact-sheet/what-issues-will-uninsured-people-face-with-testing-and-treatment-for-covid-19
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.medicinenet.com/how_do_the_covid-19_coronavirus_tests_work/article.htm"
                  href="https://www.medicinenet.com/how_do_the_covid-19_coronavirus_tests_work/article.htm"
                  target="_blank"
                >
                  https://www.medicinenet.com/how_do_the_covid-19_coronavirus_tests_work/article.htm
                </Link>
              </li>
              <li>
                <Link
                  key="https://www.nbcnews.com/health/health-news/coronavirus-testing-information-covid-19-tests-according-state-health-departments-n1158041"
                  href="https://www.nbcnews.com/health/health-news/coronavirus-testing-information-covid-19-tests-according-state-health-departments-n1158041"
                  target="_blank"
                >
                  https://www.nbcnews.com/health/health-news/coronavirus-testing-information-covid-19-tests-according-state-health-departments-n1158041
                </Link>
              </li>
            </ul>
          </div>,
        ],
      },
    ],
  };

  return displaySubHeading(subHeadingContent);
};
