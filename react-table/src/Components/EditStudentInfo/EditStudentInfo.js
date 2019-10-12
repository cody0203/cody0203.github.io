import React from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

const editStudentInfo = props => {
  const { getInputValue, currentEditStudent, addNewStudentHandler } = props;

  return (
    <div>
      <h1 className="text-center m-4">Sửa thông tin học viên</h1>

      <FormGroup>
        <Label for="name">Họ tên</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={currentEditStudent.name}
          onChange={getInputValue}
        />
      </FormGroup>

      <FormGroup>
        <Label for="birthYear">Năm sinh</Label>
        <Input
          type="text"
          name="birthYear"
          id="birthYear"
          value={currentEditStudent.birthYear}
          onChange={getInputValue}
        />
      </FormGroup>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          value={currentEditStudent.email}
          id="email"
          onChange={getInputValue}
        />
      </FormGroup>

      <FormGroup>
        <Label for="phone">Số điện thoại</Label>
        <Input
          type="text"
          name="phone"
          value={currentEditStudent.phone}
          id="phone"
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

export default editStudentInfo;
