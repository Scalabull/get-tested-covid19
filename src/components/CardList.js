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
import React from "react";

// reactstrap components
import {
  Card,
  CardBody
} from "reactstrap";

class CardList extends React.Component {
  componentDidMount() {
  }
  
  state = {

  };

  onExiting = () => {

  };

  onExited = () => {

  };

  render() {
    let topResults = this.props.items.slice(0,9);
    if (topResults === null || topResults.length === 0){
      return (
        <>
          <Card className="shadow shadow-lg--hover mt-5">
            <CardBody>
                <div className="d-flex px-3">
                <div>
                    <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                    <i className="ni ni-fat-remove" />
                    </div>
                </div>
                <div className="pl-4">
                    <h5 className="title text-primary">
                      No test centers were located within 40 miles of your zip code.
                    </h5>
                    <p className="text-muted">
                      Our data may be incomplete. Please check with your doctor and/or local government, and inform us if we are missing test centers in your area.
                    </p>
                    
                </div>
                </div>
            </CardBody>
        </Card>
        </>
      )
    } else{
      return (
        <>
          {
            
            topResults.map(item => {
              return <Card key={item.name} className="shadow shadow-lg--hover mb-5">
                        <CardBody>
                            <div className="d-flex px-3">
                            <div className="pl-4">
                                <h5 className="title text-success">
                                {item.name}
                                </h5>
                                {item.dist !== null && item.dist !== undefined &&
                                  <small className="text-black">
                                    Est. Distance: {item.dist.toFixed(2)} miles
                                  </small>
                                }
                                <p>
                                    {item.address}, {item.city} {item.state}, {item.zip}
                                </p>
                                <h6>
                                    Doctor screen required before arrival? {item.docScreen}
                                </h6>
                                <h6>
                                    Appointment Required?  {item.appReq}
                                </h6>
                                <h6>
                                    Is this a drive-thru testing site (stay in your car)? {item.driveThru}
                                </h6>
                                <h6>
                                    Is this a walk-in testing site (must come inside the facility at some point)? {item.walkUp}
                                </h6>
                                <p>
                                    <b>Hours:</b> {item.hours}
                                    <br />
                                    <b>Phone:</b> {item.phone}
                                </p>
                            </div>
                            </div>
                        </CardBody>
                    </Card>
            })
          }
        </>
      );
    }
  }
}

export default CardList;
