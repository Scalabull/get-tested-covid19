import React from 'react';
import { HeadingImage, HeadingText, HeadingWrapper } from './styles'
import HeroImage from 'assets/img/theme/How_it_works_hero.png'

export const displayHeading = () => (
  <HeadingWrapper>
    <HeadingText>
      <h1 className="display-3 text-white mt-3">
        How Does COVID-19 Testing Work?
          </h1>
      <p className="text-white">
        In the United States, the availability of COVID-19 testing varies.
        The number of sites differs by state, and the process can be
        different for individual sites. On this page, we’ll be sharing the
        basic information you need to know about how COVID-19 testing works.
          </p>
    </HeadingText>
    <HeadingImage src={HeroImage} />

  </HeadingWrapper>
);
