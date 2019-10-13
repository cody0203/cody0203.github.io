import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem, Container } from "reactstrap";
import { withRouter, Link } from "react-router-dom";

import Table from "./Table";

class App extends Component {
  render() {
    return (
      <Container>
        <Navbar color="light" light expand="md">
          <Link to="/">Home</Link>
          <Nav className="ml-auto" navbar>
            <NavItem className="mr-5">
              <Link to="/table">Danh sách sinh viên</Link>
            </NavItem>
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
          </Nav>
        </Navbar>

        <Table />
      </Container>
    );
  }
}

export default withRouter(App);
