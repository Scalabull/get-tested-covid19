
import React from 'react';
import styled from 'styled-components'

const StyledHomeDonate = styled.div`
  border-top: 1px solid #eee;
  height: 700px;
  padding: 50px 15px;
  
  @media screen and (max-width: ${props => props.theme.bpSmall}) {

  }
`

class HomeDonate extends React.Component {
  render() {
    return (
      <StyledHomeDonate>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="home-donate__about">
           <h2>Donate to Get Tested COVID-19</h2>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, similique consectetur culpa repellendus iste amet, non neque totam perspiciatis officiis suscipit ut eveniet distinctio eum necessitatibus ratione facilis beatae ipsa?</p>
          </div>
          <div className="home-donate__form">
            <div dangerouslySetInnerHTML={{ __html: `<script src="https://donorbox.org/widget.js" paypalExpress="false"></script><iframe allowpaymentrequest="" frameborder="0" height="800px" name="donorbox" scrolling="no" seamless="seamless" src="https://donorbox.org/embed/gettestedcovid?default_interval=o&hide_donation_meter=true" style="max-width: 500px; min-width: 350px; max-height:none!important" width="100%"></iframe>`}} />
          </div>
        </div>
      </StyledHomeDonate>
    );
  }
}

export default HomeDonate;
