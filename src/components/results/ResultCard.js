
import React from 'react';
import styled from 'styled-components';
import ReadMore from '../shared/ReadMore.js';
import { ButtonGroup } from 'reactstrap';

const StyledResultCard = styled.div`
  border-top: 1px solid #eee;
  padding: 40px 20px;

  h3 {
    font-size: 1.5rem;
    margin-top: -4px;
  }

  p {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 1.5em;
  }

  .card__meta {
    margin-top: -5px;
  }

  .card__dist {
    color: ${props => props.theme.colorTealDark};
    font-weight: 600;
  }

  .card__req {
    margin: 15px 0 5px;
    line-height: 1.8em;

    .badge {
      margin-right: 5px;
      font-size: 13px;
      padding: 0.4em 0.6em;
    }

    .badge-danger {
      background-color: ${props => props.theme.colorRed};
    }

    .badge-success {
      background-color: ${props => props.theme.colorGreen};
    }
  }

  .card__descr {
    font-weight: 400;
  }

  .card__actions {
    margin-top: 15px;

    .fas {
      margin-right: 5px;
    }
  }

  .card__actions-mobile {
    display: block;

    @media screen and (min-width: ${props => props.theme.bpSmall}) {
      display: none;
    }
  }

  .card__actions-desktop {
    display: none;

    @media screen and (min-width: ${props => props.theme.bpSmall}) {
      display: block;
    }
  }

  .card__features {
    margin-top: 5px;
    font-weight: 500;
  }

  .card__feature {
    width: 50%;
    display: inline-block;
    font-weight: 300;
    font-size: 14px;

    .fas {
      margin-right: 8px;
    }

    strong {
      font-weight: 600;
    }

    @media screen and (max-width: ${props => props.theme.bpSmall}) {
      width: 100%;
    }
  }

  .card__ability-icon {
    height: 20px;
    margin-right: 5px;
  }
`

class ResultCard extends React.Component {
  render() {
    const { name, distance, address, city, state, zip, phone_number, website, facilities_provided, doctor_screen_required_beforehand, appointment_required, drive_thru_site } = this.props.item;
    return (
        <StyledResultCard>
          <h3>{this.props.index + 1}. {name}</h3>
          <p className="card__meta">
            {distance !== null && distance !== undefined && (<><span className="card__dist">{(distance/1609).toFixed(2)} mi</span> &middot; </>)}{address}<span className="d-none d-sm-inline">, {city}</span> &middot; {phone_number.split(')')[0]}) {phone_number.split(')')[1]}
          </p>
          <div className="card__req">
            {!doctor_screen_required_beforehand && !appointment_required && <span className="badge badge-success"><i className="fas fa-check icon-left" />Walk-in testing available</span>}
            {(doctor_screen_required_beforehand || appointment_required) && (
              <>
                {doctor_screen_required_beforehand && <span className="badge badge-danger"><i className="fas fa-times icon-left" />Doctor's screening required</span>}
                {appointment_required && <span className="badge badge-danger"><i className="fas fa-times icon-left" />Appointment required</span>}
              </>
            )}
          </div>
          <p className="card__descr">
            <ReadMore lines={2}>
                {facilities_provided}
            </ReadMore>
          </p>
          <div className="card__features">
            <div className="card__feature"><i className="fas fa-car-side" />Drive-through testing <strong>{drive_thru_site ? 'Yes' : 'No'}</strong></div>
          </div>
          <div className="card__actions">
            <ButtonGroup className="card__actions-mobile" size="sm">
              <a className="btn btn-outline-primary" href={`https://www.google.com/maps/dir/current+location/${address}+${city}+${state}+${zip}/`} target="_blank" rel="noopener noreferrer">Get directions</a>
              {website !== '' && <a className="btn btn-outline-primary" href={website} target="_blank" rel="noopener noreferrer">Visit website</a>}
              {phone_number !== '' && (
                <a className="btn btn-outline-primary card__call" href={`tel: ${phone_number}`}  target="_blank" rel="noopener noreferrer">Call</a>  
              )}
            </ButtonGroup>
            <ButtonGroup className="card__actions-desktop" size="sm">
              <a className="btn btn-outline-primary" href={`https://www.google.com/maps/dir/current+location/${address}+${city}+${state}+${zip}/`} target="_blank" rel="noopener noreferrer"><i className="fas fa-directions" />Get directions</a>
              {website !== '' && <a className="btn btn-outline-primary" href={website} target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-square-alt" />Visit website</a>}
            </ButtonGroup>
          </div>
        </StyledResultCard>
    )
  }
}

export default ResultCard;