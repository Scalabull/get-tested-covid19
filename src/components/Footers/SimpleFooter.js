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
/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  NavbarBrand,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
      <footer className=" footer">
          <Container>

            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                  <img
                    alt="..."
                    src={require("assets/img/brand/GetTestedCovid19Finallogocolorfinal.png")}
                  />
                </NavbarBrand>
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                  Get-Tested-COVID19
                </div>
              </Col>
              <Col md="6">
                <Nav className=" nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="/"
                    >
                      FIND TEST CENTER
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/resources"
                    >
                      RESOURCES
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/about"
                    >
                      ABOUT
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
