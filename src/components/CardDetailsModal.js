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
// nodejs library that concatenates classes
import classnames from 'classnames';
// reactstrap components
import { Button, Modal, Row, Col, Badge } from 'reactstrap';

class Modals extends React.Component {
  state = {};
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  render() {
    let { item } = this.props;
    return (
      <>
        <Row>
          <Col md="4"></Col>
          <Col md="4">
            <Button
              block
              className="mb-3"
              color="primary"
              type="button"
              onClick={() => {
                this.toggleModal('defaultModal');
              }}
            >
              Additional Information
            </Button>
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal('defaultModal')}
            >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  <a link={item.link}>{item.name}</a>
                </h4>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal('defaultModal')}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>General Info</h6>
                <p>{item.description}</p>
                {item.estCap ? (
                  <>
                    <h6>Estimated Capacity</h6>
                    <p>{item.estCap}</p>
                  </>
                ) : (
                  ''
                )}

                <h6>Days of Operation</h6>
                <p>{item.days}</p>
              </div>
              <div className="modal-footer">
                {item.link ? (
                  <Badge href={item.link} target="_blank" color="info">
                    Test Center Website
                  </Badge>
                ) : (
                  ''
                )}
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal('defaultModal')}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
          <Col md="4"></Col>
        </Row>
      </>
    );
  }
}

export default Modals;
