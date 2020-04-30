import React from 'react'

// reactstrap components
import {
  Container,
  Card,
  Button,
  CardBody,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from 'reactstrap'

import { Container, Card, Button, CardBody, UncontrolledPopover, PopoverBody, PopoverHeader } from 'reactstrap';

import icon1 from '../assets/img/icons/card/Hospital.png'
import icon2 from '../assets/img/icons/card/Doc-blue.png'
import icon2Red from '../assets/img/icons/card/Doc-red.png'
import icon3 from '../assets/img/icons/card/DriveThrough.png'
import icon4 from '../assets/img/icons/card/Appointment-blue.png'
import icon4Red from '../assets/img/icons/card/Appointment-red.png'

class CardList extends React.Component {
  componentDidMount() {}

  state = {}

  onExiting = () => {}

  onExited = () => {}

  DisplayCardItem = (icon, title, alt, item) => (
    <Container>
      <div className="cardlist-item-container">
        <div className="cardlist-item-icon">
          <img src={icon} alt={alt} height="25px" />
        </div>
        <div className="cardlist-item-title">
          <strong>{title}</strong>
        </div>
        <div className="cardlist-item-yes-no">
          <span className="medWeight">{item}</span>
        </div>
      </div>
    </Container>
  )

  render() {
    let topResults = this.props.items
    if (topResults === null || topResults.length === 0) {
      return (
        <>
          <Card className="shadow shadow-lg--hover pt-4 pb-4 mb-3 mt-3">
            <CardBody>
              <div className="d-flex px-3">
                <div>
                  <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                    <i className="ni ni-fat-remove" />
                  </div>
                </div>
                <div className="pl-4">
                  <h5 className="title text-primary">
                    No test centers were located within 40 miles of your zip
                    code.
                  </h5>
                  <p className="text-muted">
                    Our data may be incomplete. Please check with your doctor
                    and/or local government, and inform us if we are missing
                    test centers in your area.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )
    } else {
      return (
        <>
          {topResults.map((item, index) => {
            if (item.link === '') {
              item.link = 'Unavailable'
            }
            if (item.phone === '') {
              item.phone = 'Unavailable'
            }
            if (item.docScreen === '') {
              item.docScreen = 'N/A'
            }
            if (item.appReq === '') {
              item.appReq = 'N/A'
            }
            if (item.driveThru === '') {
              item.driveThru = 'N/A'
            }
            if (item.walkUp === '') {
              item.walkUp = 'N/A'
            }
            item.docScreen = item.docScreen.toUpperCase()
            item.appReq = item.appReq.toUpperCase()
            item.driveThru = item.driveThru.toUpperCase()
            item.walkUp = item.walkUp.toUpperCase()

            return (
              <Card
                key={index}
                className="shadow shadow-lg--hover pt-4 pb-4 mb-3 mt-3"
              >
                <CardBody>
                  <div>
                    <h4 className="display-4 mb-0 card-head-text">
                      {index + 1 + '. ' + item.name}
                    </h4>

                    <p className="mb-0 pb-0">
                      <strong className="mb-0 pb-0">
                        {item.address}, {item.city} {item.state}, {item.zip}
                      </strong>
                      {item.dist !== null && item.dist !== undefined && (
                        <>
                          <br />
                          <small className="text-danger pt-0 mt-0">
                            {item.dist.toFixed(2)} mi.
                          </small>
                        </>
                      )}
                    </p>
                    <p className="mb-0 pb-0">
                      <strong className="pt-0 mt-0">Ph:</strong> {item.phone}
                      <br />
                      <strong className="pt-0 mt-0">Site:</strong>{' '}
                      <a href={item.link}>{item.link}</a>
                    </p>
                    <div className="cardlist-item-grid">
                      <div>
                        {this.DisplayCardItem(
                          icon1,
                          'In-Facility Testing?',
                          'hospital icon',
                          item.walkUp
                        )}
                      </div>
                      <div>
                        {item.docScreen === 'YES'
                          ? this.DisplayCardItem(
                              icon2Red,
                              'Doctor Screening Required?',
                              'doctor',
                              item.docScreen
                            )
                          : this.DisplayCardItem(
                              icon2,
                              'Doctor Screening Required?',
                              'doctor',
                              item.docScreen
                            )}
                      </div>
                      <div>
                        {this.DisplayCardItem(
                          icon3,
                          'Drive-Thru Testing?',
                          'car driving',
                          item.driveThru
                        )}
                      </div>
                      <div>
                        {item.appReq === 'YES'
                          ? this.DisplayCardItem(
                              icon4Red,
                              'Appointment Required?',
                              'calendar',
                              item.appReq
                            )
                          : this.DisplayCardItem(
                              icon4,
                              'Appointment Required?',
                              'calendar',
                              item.appReq
                            )}
                      </div>
                    </div>
                    {item.description !== null &&
                      item.description !== undefined &&
                      item.description !== '' && (
                        <>
                          <hr />
                          <Button color="danger" id={'vm-' + index} size="sm">
                            View Message
                          </Button>
                          <span>from {item.name}</span>

                          <UncontrolledPopover
                            trigger="focus"
                            placement="top"
                            target={'vm-' + index}
                          >
                            <PopoverHeader>View message</PopoverHeader>
                            <PopoverBody>{item.description}</PopoverBody>
                          </UncontrolledPopover>
                        </>
                      )}
                  </div>
                </CardBody>
              </Card>
            )
          })}
        </>
      )
    }
  }
}

export default CardList
