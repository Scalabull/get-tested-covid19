import React from 'react';
import { CDCContainer } from './styles'

export const displayCDCNotice = () => {
  return (
    <CDCContainer>
      <h5>
        Please note: Per the CDC, If you develop any of these emergency
        warning signs* for COVID-19, get medical attention immediately:
        </h5>
      <ul>
        <li>Trouble breathing</li>
        <li>Persistent pain or pressure in the chest</li>
        <li>New confusion or inability to arouse</li>
        <li>Bluish lips or face</li>
      </ul>
      <p>
        *This list is not all inclusive. Please consult your medical provider
        for any other symptoms that are severe or concerning to you.
        </p>
      <p>
        Call 911 if you have a medical emergency: Notify the operator that you
        have, or think you might have, COVID-19. If possible, put on a cloth
        face covering before medical help arrives.
        </p>
    </CDCContainer>
  );
};
