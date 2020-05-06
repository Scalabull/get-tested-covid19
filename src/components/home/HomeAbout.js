
import React from 'react';
import styled from 'styled-components'

const StyledHomeAbout = styled.div`
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 400px;
  text-align: center;

  h1 {
      margin-bottom: 15px;
  }

  p {
      margin-bottom: 20px;
  }

  .container {
    max-width: 500px;
  }
`

class HomeAbout extends React.Component {
  render() {
    return (
      <StyledHomeAbout>
        <div className="container">
          <h2>Helping beat COVID-19</h2>
          <p>We're a team of volunteers working around-the-clock to provide accurate information on test centers. See an issue? Let us know and we'll fix it. Stay safe.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdr_SEZYn9s6SOahSEGMkrWn4_p-9sCJQf9HtWFyNR9mAPCow/viewform?usp=sf_link" className="btn btn-primary">Contact us</a>
        </div>
      </StyledHomeAbout>
    );
  }
}

export default HomeAbout;
