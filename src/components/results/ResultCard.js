
import React from 'react';
import iconInFacility from '../../assets/img/icons/card/Hospital.png';
import iconDrive from '../../assets/img/icons/card/DriveThrough.png';
import styled from 'styled-components';
import ReadMore from '../shared/ReadMore.js';
import { ButtonGroup } from 'reactstrap';

const StyledResultCard = styled.div`
  border-top: 1px solid #eee;
  padding: 40px 20px;

  h3 {
    font-size: 1.5rem;
    margin-top: -5px;
  }

  p {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .card__meta {
    margin-top: -5px;
  }

  .card__req {
    margin: 10px 0 5px;

    .badge {
      margin-right: 5px;
    }
  }

  .card__actions {
    margin-top: 15px;
  }

  .card__actions-desktop {
    display: block;

    @media screen and (min-width: ${props => props.theme.bpSmall}) {
      display: none;
    }
  }

  .card__actions-mobile {
    display: none;

    @media screen and (min-width: ${props => props.theme.bpSmall}) {
      display: block;
    }
  }

  .card__features {
    margin-top: 5px;
    font-weight: 500;

    .fa {
      margin-right: 5px;
    }
  }

  .card__feature {
    width: 50%;
    display: inline-block;
    font-size: 13px;
    font-weight: 300;

    .fa {
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
    const { name, dist, address, city, state, zip, phone, link, description, docScreen, appReq, driveThru, walkUp } = this.props.item;
    return (
        <StyledResultCard>
          <h3>{this.props.index + 1}. {name}</h3>
          <p className="card__meta text-secondary">
            {dist !== null && dist !== undefined && `${dist.toFixed(2)} mi · `}{address}<span className="d-none d-sm-inline">, {city}</span> &middot; {phone.split(')')[0]}) {phone.split(')')[1]}
          </p>
          <div className="card__req">
            {docScreen === "No" && appReq === "No" && <span class="badge badge-success"><i className="fa fa-check icon-right" /> Walk-in testing available</span>}
            {(docScreen !== "No" || appReq !== "No") && (
              <>
                {docScreen === "Yes" && <span className="badge badge-danger"><i className="fa fa-user-md icon-right" /> Doctor's screening required</span>}
                {appReq === "Yes" && <span className="badge badge-danger"><i className="fa fa-calendar icon-right" /> Appointment required</span>}
              </>
            )}
          </div>
          <p className="card__descr">
            <ReadMore lines={2}>
                {description}
            </ReadMore>
          </p>
          <div className="card__features">
            <div className="card__feature"><i className="fa fa-hospital-o" />In-facility testing <strong>{walkUp}</strong></div>
            <div className="card__feature"><i className="fa fa-automobile" />Drive-through testing <strong>{driveThru}</strong></div>
          </div>
          <div className="card__actions">
            <ButtonGroup className="card__actions-desktop" size="sm">
              <a class="btn btn-outline-primary" href={`https://www.google.com/maps/dir/current+location/${address}+${city}+${state}+${zip}/`} target="_blank" rel="noopener noreferrer">Get directions</a>
              {link !== '' && <a className="btn btn-outline-primary" href={link} target="_blank" rel="noopener noreferrer">Visit website</a>}
              {phone !== '' && (
                <a className="btn btn-outline-primary card__call" href={`tel: ${phone}`}  target="_blank" rel="noopener noreferrer">Call</a>
              )}
            </ButtonGroup>
            <ButtonGroup className="card__actions-mobile" size="sm">
              <a class="btn btn-outline-primary" href={`https://www.google.com/maps/dir/current+location/${address}+${city}+${state}+${zip}/`} target="_blank" rel="noopener noreferrer">Get directions</a>
              {link !== '' && <a className="btn btn-outline-primary" href={link} target="_blank" rel="noopener noreferrer">Visit website</a>}
            </ButtonGroup>
          </div>
        </StyledResultCard>
    )
  }
}

export default ResultCard;