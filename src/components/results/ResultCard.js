
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

  .card__req {
    margin: 0 0 5px;
  }

  .card__actions {
    margin-top: 10px;
  }

  .card__abilities {
    margin-top: 5px;
    font-weight: 500;

    .fa {
      margin-right: 5px;
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
          <div className="card__req">
            {docScreen === "No" && appReq === "No" && <span class="badge badge-success">No requirements for testing</span>}
            {(docScreen !== "No" || appReq !== "No") && (
              <span className="badge badge-danger">
                {(docScreen === "Yes" && appReq === "No") && "Doctor's screening "}
                {(docScreen === "Yes" && appReq === "Yes") && "Doctor's screening and appointment "}
                {(docScreen === "No" && appReq === "Yes") && "Appointment "}
                required
              </span>
            )}
          </div>
          <p className="card__descr">
            <ReadMore lines={2}>
                {description}
            </ReadMore>
          </p>
          <p className="card__abilities">
            {walkUp === 'Yes' && (
              <span><i className="fa fa-hospital-o" />In-facility testing</span>
            )}
            {driveThru === 'Yes' && (
              <span><i className="fa fa-automobile" />Drive through testing</span>
            )}
          </p>
          <p className="card__meta text-secondary">
            {dist !== null && dist !== undefined && `${dist.toFixed(2)} mi · `}{address}, {city} &middot; {phone.split(')')[0]}) {phone.split(')')[1]}
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