
import React from 'react';

import { Container, Card, Button, CardBody, UncontrolledPopover, PopoverBody, PopoverHeader } from 'reactstrap';

import icon1 from '../assets/img/icons/card/Hospital.png';
import icon2 from '../assets/img/icons/card/Doc-blue.png';
import icon3 from '../assets/img/icons/card/DriveThrough.png';
import icon4 from '../assets/img/icons/card/Appointment-blue.png';
const METERS_PER_MILE = 1609;

class CardList extends React.Component {
    componentDidMount() {}

    state = {};

    onExiting = () => {};

    onExited = () => {};

    DisplayCardItem = (icon, title, alt, item) => (
        <Container>
            <div className='cardlist-item-container'>
                <div className='cardlist-item-icon'>
                    <img src={icon} alt={alt} height="25px" />
                </div>
                <div className='cardlist-item-title'>
                    <strong>{title}</strong>
                </div>
                <div className='cardlist-item-yes-no'>
                    <span className='medWeight'>{item}</span>
                </div>
            </div>
        </Container>
    );

    render() {
        let topResults = this.props.items;
        if (topResults === null || topResults.length === 0) {
            return (
                <>
                    <Card className='shadow shadow-lg--hover pt-4 pb-4 mb-3 mt-3'>
                        <CardBody>
                            <div className='d-flex px-3'>
                                <div>
                                    <div className='icon icon-shape bg-gradient-warning rounded-circle text-white'>
                                        <i className='ni ni-fat-remove' />
                                    </div>
                                </div>
                                <div className='pl-4'>
                                    <h5 className='title text-primary'>
                                        No test centers were located within 40 miles of your zip code.
                                    </h5>
                                    <p className='text-muted'>
                                        Our data may be incomplete. Please check with your doctor and/or local
                                        government, and inform us if we are missing test centers in your area.
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </>
            );
        } else {
            return (
                <>
                    {topResults.map((item, index) => {
                        if (!item.website || item.website === '') {
                            item.website = 'Unavailable';
                        }
                        if (!item.phone_number || item.phone_number === '') {
                            item.phone_number = 'Unavailable';
                        }
                        switch(item.doctor_screen_required_beforehand){
                            case true:
                                item.docScreen = 'YES';
                                break;
                            case false:
                                item.docScreen = 'NO';
                                break;
                            default:
                                item.docScreen = 'N/A';
                                break;
                        };
                        switch(item.appointment_required){
                            case true:
                                item.appReq = 'YES';
                                break;
                            case false:
                                item.appReq = 'NO';
                                break;
                            default:
                                item.appReq = 'N/A';
                                break;
                        }
                        switch(item.drive_thru_site){
                            case true:
                                item.driveThru = 'YES';
                                break;
                            case false:
                                item.driveThru = 'NO';
                                break;
                            default:
                                item.driveThru = 'N/A';
                                break;
                        }
                        switch(item.walk_in_site){
                            case true:
                                item.walkIn = 'YES';
                                break;
                            case false:
                                item.walkIn = 'NO';
                                break;
                            default:
                                item.walkIn = 'N/A';
                                break;
                        }

                        if(!item.distance){
                            item.distance = 0;
                        }
                        item.distance = item.distance / METERS_PER_MILE;

                        return (
                            <Card key={index} className='shadow shadow-lg--hover pt-4 pb-4 mb-3 mt-3'>
                                <CardBody>
                                    <div>
                                        <h4 className='display-4 mb-0 card-head-text'>
                                            {index + 1 + '. ' + item.name}
                                        </h4>

                                        <p className='mb-0 pb-0'>
                                            <strong className='mb-0 pb-0'>
                                                {item.address}, {item.city} {item.state}, {item.zipcode}
                                            </strong>
                                            {item.distance !== null && item.distance !== undefined && (
                                                <>
                                                    <br />
                                                    <small className='text-danger pt-0 mt-0'>
                                                        {item.distance.toFixed(2)} mi.
                                                    </small>
                                                </>
                                            )}
                                        </p>
                                        <p className='mb-0 pb-0'>
                                            <strong className='pt-0 mt-0'>Ph:</strong> {item.phone_number}
                                            <br />
                                            <strong className='pt-0 mt-0'>Site:</strong>{' '}
                                            <a href={item.website}>{item.website}</a>
                                        </p>
                                        <div className='cardlist-item-grid'>
                                            <div>
                                                {this.DisplayCardItem(
                                                    icon1,
                                                    'In-Facility Testing?',
                                                    'hospital icon',
                                                    item.walkIn
                                                )}
                                            </div>
                                            <div>
                                                {this.DisplayCardItem(
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
                                                {this.DisplayCardItem(
                                                    icon4,
                                                    'Appointment Required?',
                                                    'calendar',
                                                    item.appReq
                                                )}
                                            </div>
                                        </div>
                                        {item.facilities_provided !== null &&
                                            item.facilities_provided !== undefined &&
                                            item.facilities_provided !== '' && (
                                                <>
                                                    <hr />
                                                    <Button color='danger' id={'vm-' + index} size='sm'>
                                                        View Message
                                                    </Button>
                                                    <span>from {item.name}</span>

                                                    <UncontrolledPopover
                                                        trigger='focus'
                                                        placement='top'
                                                        target={'vm-' + index}
                                                    >
                                                        <PopoverHeader>View message</PopoverHeader>
                                                        <PopoverBody>{item.facilities_provided}</PopoverBody>
                                                    </UncontrolledPopover>
                                                </>
                                            )}
                                    </div>
                                </CardBody>
                            </Card>
                        );
                    })}
                </>
            );
        }
    }
}

export default CardList;
