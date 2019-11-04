import React from "react";
import { Table, Button, Spinner } from "reactstrap";
import editIcon from "../assets/edit.svg";
import removeIcon from "../assets/remove.svg";

import { Link } from "react-router-dom";

import "./StudentTable.css";

const StudentTable = props => {
  const {
    students,
    deleteStudent,
    editStudent,
    navToAddNewStudent,
    isLoading,
    deletingStatus,
    currentDeletingRow
  } = props;

  let tableBody = null;

  if (!isLoading) {
    tableBody = students.map((student, index) => {
      return (
        <tr
          className="DetailRow"
          key={student.id}
          style={
            currentDeletingRow === student.id
              ? {
                  backgroundColor: "rgb(243, 131, 131)",
                  transition: "all 1s ease"
                }
              : { backgroundColor: "initial" }
          }
        >
          <td>{student.name || ""}</td>
          <td>{student.birthYear || ""}</td>
          <td>{student.email || ""}</td>
          <td>{student.phone || ""}</td>
          <td>
            <Link
              to="/table/edit-student-info"
              style={{ pointerEvents: deletingStatus }}
            >
              <img
                className="Icon"
                src={editIcon}
                style={{
                  marginRight: 20
                }}
                onClick={editStudent.bind(null, student.id)}
                alt="edit"
              />
            </Link>
            <img
              onClick={deleteStudent.bind(null, student.id, index)}
              className="Icon"
              src={removeIcon}
              alt="delete"
              style={{ pointerEvents: deletingStatus }}
            />
          </td>
        </tr>
      );
    });
  } else {
    tableBody = (
      <tr style={{ backgroundColor: "transparent", textAlign: "center" }}>
        <td colSpan="5">
          <Spinner />
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div className="header d-flex align-items-center">
        <Link to="/table/add-new-student">
          <Button color="primary" onClick={navToAddNewStudent}>
            + Thêm học viên
          </Button>
        </Link>
        <h1 className="text-center m-4" style={{ width: "70%" }}>
          Danh sách học viên
        </h1>
      </div>

      <Table striped hover>
        <thead className="thead-dark">
          <tr>
            <th>Họ tên</th>
            <th>Năm sinh</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th style={{ minWidth: 100 }}>Action</th>
          </tr>
        </thead>

        <tbody>{tableBody}</tbody>
      </Table>
    </div>
  );
};

export default StudentTable;
