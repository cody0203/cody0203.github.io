import React from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container>
      <h1>Login</h1>
      <Link to="/">
        <Button color="primary">Trở về trang chủ</Button>
      </Link>
    </Container>
  );
};

export default Login;
