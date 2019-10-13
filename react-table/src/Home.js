import React from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center">
      <h1>Home</h1>
      <div className="d-flex justify-content-between">
        <Link to="/table">
          <Button color="primary">Đến trang danh sách học viên</Button>
        </Link>

        <Link to="/login">
          <Button color="primary">Đến đăng nhập</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
