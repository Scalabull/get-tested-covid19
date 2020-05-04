
import React from 'react';
import iconInFacility from '../../assets/img/icons/card/Hospital.png';
import iconDrive from '../../assets/img/icons/card/DriveThrough.png';
import styled from 'styled-components';
import ReadMore from '../shared/ReadMore.js';
import { ButtonGroup } from 'reactstrap';

const StyledResultCard = styled.div`
  border-top: 1px solid #eee;
  padding: 20px;

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .card__req {
    margin: -3px 0 5px;
  }

  .card__actions {
    margin-top: 15px;
  }

  .card__abilities {
    margin-top: 10px;
    font-weight: 500;
  }

  .card__ability-icon {
    height: 20px;
    margin-right: 5px;
  }
`

class ResultCard extends React.Component {
  render() {
    const { name, address, city, state, zip, phone, link, description, docScreen, appReq, driveThru, walkUp } = this.props.item;
    return (
        <StyledResultCard>
          <h3>{this.props.index + 1}. {name}</h3>
          <div className="card__req">
            {docScreen === "No" && appReq === "No" && <span class="badge badge-success">No requirements for testing</span>}
            {(docScreen !== "No" || appReq !== "No") && (
              <span class="badge badge-danger">
                {(docScreen === "Yes" && appReq === "No") && "Doctor's screening "}
                {(docScreen === "Yes" && appReq === "Yes") && "Doctor's screening and appointment "}
                {(docScreen === "No" && appReq === "Yes") && "Appointment "}
                required
              </span>
            )}
          </div>
          <p className="card__meta text-secondary">
            {address}, {city} &middot; {phone.split(')')[0]}) {phone.split(')')[1]}
          </p>
          <p className="card__descr">
            <ReadMore lines={2}>
                {description}
            </ReadMore>
          </p>
          <p className="card__abilities">
            {walkUp === 'Yes' && (
              <span><img className="card__ability-icon" src={iconInFacility} alt="Has in-facility testing"/>In-facility testing</span>
            )}
            {driveThru === 'Yes' && (
              <span><img className="card__ability-icon" src={iconDrive} alt="Has drive through testing" />Drive through testing</span>
            )}
          </p>
          <div className="card__actions">
            <ButtonGroup size="sm">
              <a class="btn btn-outline-primary" href={`https://www.google.com/maps/dir/current+location/${address}+${city}+${state}+${zip}/`} target="_blank" rel="noopener noreferrer">Get directions</a>
              {phone !== '' && (
                <a className="btn btn-outline-primary" href={`tel: ${phone}`}  target="_blank" rel="noopener noreferrer">Call</a>
              )}
              {link !== '' && <a className="btn btn-outline-primary" href={link} target="_blank" rel="noopener noreferrer">Visit website</a>}
            </ButtonGroup>
          </div>
        </StyledResultCard>
    )
  }
}

export default ResultCard;