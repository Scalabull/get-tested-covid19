import React from 'react';
import Link from 'components/Link/Link.js';
import { TextLink } from '../sharedStyles'
import WTIImage from '../../../assets/img/theme/Why_testing_is_imp_image.png'
import { WhyTestingWrapper, WhyTestingText, WhyTestingImage } from './styles'

export const displayWhyIsTestingImportant = () => {
  return (
    <WhyTestingWrapper>
      <WhyTestingText><h1 className="display-3 text-black mt-3">Why is testing important?
</h1>
        <p><TextLink href='https://www.healthaffairs.org/do/10.1377/hblog20200406.55720/full/'>Free, widespread testing will play an enormous role in the ability to contain COVID-19.</TextLink> South Korea stands a benchmark for <TextLink href='https://www.visualcapitalist.com/infection-trajectory-flattening-the-covid19-curve/'>testing capacity and thus their ability to limit infection rates.</TextLink> Until widespread testing is available in the US, it’s important to stay informed about what services are available to you. </p>
        <p>That’s why we created <TextLink href='https://get-tested-covid19.org/'>Get Tested COVID-19</TextLink>. We want it to be as simple as possible to find your nearest testing site and have all of the information to get tested safely. As more testing centers open and can facilitate more people being tested (with fewer requirements), we want to help support communities getting tested across the US.</p>
      </WhyTestingText>
      <WhyTestingImage src={WTIImage} />
    </WhyTestingWrapper>
  )
}
