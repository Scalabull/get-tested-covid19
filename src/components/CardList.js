/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';

// reactstrap components
import { Row, Col, Card, Button, CardBody, UncontrolledPopover, PopoverBody, PopoverHeader} from 'reactstrap';


class CardList extends React.Component {
    componentDidMount() {}

    state = {};

    onExiting = () => {};

    onExited = () => {};

    render() {
        let topResults = this.props.items
        if (topResults === null || topResults.length === 0) {
            return (
                <>
                    <Card className='shadow shadow-lg--hover mt-5'>
                        <CardBody>
                            <div className='d-flex px-3'>
                                <div>
                                    <div className='icon icon-shape bg-gradient-warning rounded-circle text-white'>
                                        <i className='ni ni-fat-remove' />
                                    </div>
                                </div>
                                <div className='pl-4'>
                                    <h5 className='title text-primary'>
                                        No test centers were located within 40
                                        miles of your zip code.
                                    </h5>
                                    <p className='text-muted'>
                                        Our data may be incomplete. Please check
                                        with your doctor and/or local
                                        government, and inform us if we are
                                        missing test centers in your area.
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
                        if(item.link === ''){
                            item.link = 'Unavailable'
                        }
                        if(item.phone === ''){
                            item.phone = 'Unavailable'
                        }
                        if(item.docScreen === ''){
                            item.docScreen = 'N/A'
                        }
                        if(item.appReq === ''){
                            item.appReq = 'N/A'
                        }
                        if(item.driveThru === ''){
                            item.driveThru = 'N/A'
                        }
                        if(item.walkUp === ''){
                            item.walkUp = 'N/A'
                        }
                        item.docScreen = item.docScreen.toUpperCase()
                        item.appReq = item.appReq.toUpperCase()
                        item.driveThru = item.driveThru.toUpperCase()
                        item.walkUp = item.walkUp.toUpperCase()

                        return (
                            <Card
                                key={index}
                                className='shadow shadow-lg--hover mb-5'
                            >
                                <CardBody>
                                    <div className='d-flex px-3'>
                                        <div className='pl-4'>
                                            <h4 className="display-4 mb-0">
                                            {item.name}
                                            </h4>
                                                                           
                                            <p>
                                                {item.address}, {item.city}{' '}
                                                {item.state}, {item.zip}
                                            </p>
                                            {item.dist !== null &&
                                                item.dist !== undefined && (
                                                    <small className='text-black pt-0 mt-0'>
                                                        Est. Distance:{' '}
                                                        {item.dist.toFixed(2)}{' '}
                                                        miles
                                                    </small>
                                                )}
                                            <p>
                                                <b>Ph:</b> {item.phone}
                                                <br />
                                                <b>Site:</b> {item.link}
                                            </p>
                                            <Row className='row-grid align-items-start mb-0 pb-0'>
                                                <Col lg='6 mt-0 pt-0'>
                                                    <h6>
                                                        <strong>In-Facility Testing?{' '}</strong>
                                                        {item.walkUp}
                                                    </h6>
                                                </Col>
                                                <Col lg='6 mt-0 pt-0'>
                                                    <h6>
                                                        <strong>Doctor Screening Required?{' '}</strong>
                                                        {item.docScreen}
                                                    </h6>
                                                </Col>
                                            </Row>
                                            <Row className='row-grid align-items-start mt-0 pt-0'>
                                                <Col lg='6 mt-0 pt-0'>
                                                    <h6>
                                                        <strong>Drive-Thru Testing?{' '}</strong>
                                                        {item.driveThru}
                                                    </h6>
                                                </Col>
                                                <Col lg='6 mt-0 pt-0'>
                                                    <h6>
                                                        <strong>Appointment Required?{' '}</strong>
                                                        {item.appReq}
                                                    </h6>
                                                </Col>
                                            </Row>
                                            
                                            {item.description !== null &&
                                                item.description !== undefined && 
                                                    item.description !== "" && (
                                                    <>
                                                    <hr />
                                                    <Button color="danger" id={"vm-" + index} size="sm">
                                                    View Message
                                                    </Button>
                                                    <span>from {item.name}</span>

                                                    <UncontrolledPopover
                                                    trigger="focus"
                                                    placement="top"
                                                    target={"vm-" + index}
                                                    >
                                                    <PopoverHeader>View message</PopoverHeader>
                                                    <PopoverBody>
                                                        {item.description}
                                                    </PopoverBody>
                                                    </UncontrolledPopover>
                                                    
                                                    </>
                                                )}
                                        </div>
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
