import React from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const addNewStudent = props => {
  const { getInputValue, inputData, addNewStudentHandler } = props;
  return (
    <div>
      <h1 className="text-center m-4">Thêm học viên mới</h1>

      <FormGroup>
        <Label for="name">Họ tên</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={inputData.name || ""}
          onChange={getInputValue}
        />
      </FormGroup>

      <FormGroup>
        <Label for="birthYear">Năm sinh</Label>
        <Input
          type="text"
          name="birthYear"
          id="birthYear"
          value={inputData.birthYear || ""}
          onChange={getInputValue}
        />
      </FormGroup>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={inputData.email || ""}
          onChange={getInputValue}
        />
      </FormGroup>

      <FormGroup>
        <Label for="phone">Số điện thoại</Label>
        <Input
          type="text"
          name="phone"
          id="phone"
          value={inputData.phone || ""}
          onChange={getInputValue}
        />
      </FormGroup>

      <Button color="primary" onClick={addNewStudentHandler}>
        Thêm mới
      </Button>
      <Link to="/">
        <Button color="secondary ml-3">Quay lại</Button>
      </Link>
    </div>
  );
};

addNewStudent.propTypes = {
  newStudentData: PropTypes.shape({
    name: PropTypes.string,
    birthYear: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  })
};

export default addNewStudent;
