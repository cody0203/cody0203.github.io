import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem } from "reactstrap";
import { Switch, Route, withRouter, Link } from "react-router-dom";

import Table from "./Table";
import Login from "./Login";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to="/">Home</Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/table">Danh sách sinh viên</Link>
            </NavItem>
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
