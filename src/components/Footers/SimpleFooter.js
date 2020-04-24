
/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import {
  NavItem,
  NavLink,
  Nav,
  NavbarBrand,
  Container,
  Row,
  Col
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
