
import React from 'react';
import icon1 from '../../assets/img/icons/card/Hospital.png';
import icon2 from '../../assets/img/icons/card/Doc-blue.png';
import icon3 from '../../assets/img/icons/card/DriveThrough.png';
import icon4 from '../../assets/img/icons/card/Appointment-blue.png';
import styled from 'styled-components';
import ReadMore from '../shared/ReadMore.js';

const StyledResultCard = styled.div`
  border-top: 1px solid #eee;
  padding: 15px;

  h3 {
    font-size: 1.5rem;
  }

  .card__call {
    @media screen and (min-width: ${props => props.theme.bpSmall}) {
      display: none;
    }
  }

  p {
    margin-bottom: 5px;
    font-size: 15px;
  }
`

class ResultCard extends React.Component {
  render() {
    const { name, address, city, state, zip, phone, link, description } = this.props.item;
    return (
        <StyledResultCard>
          <h3>{this.props.index + 1}. {name}</h3>
          <p className="card__location text-secondary">
            {address}, {city} &middot; <a href={`https://www.google.com/maps/dir/current+location/${address}+${city}+${state}+${zip}/`} target="_blank" rel="noopener noreferrer">Get directions</a>
          </p>
          <p className="card__contact text-secondary">
            {phone !== '' && (
              <>
                {phone.split(')')[0]}) {phone.split(')')[1]}<span className="card__call"> &middot; <a href={`tel: ${phone}`} target="_blank" rel="noopener noreferrer">Call</a></span>
              </>
            )}
            {phone !== '' && link !== '' && <> &middot; </>}
            {link !== '' && <a href={link} target="_blank" rel="noopener noreferrer">{domain_from_url(link)}</a>}
          </p>
          <p className="card__descr">
            <ReadMore lines={2}>
                {description}
            </ReadMore>
          </p>
        </StyledResultCard>
    )
  }
}

export default ResultCard;

function domain_from_url(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
}