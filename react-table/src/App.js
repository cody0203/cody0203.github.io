import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container } from "reactstrap";
import { Switch, Route, withRouter } from "react-router-dom";

import StudentTable from "./Components/StudentTable";
import AddNewStudent from "./Components/AddNewStudent/AddNewStudent";
import EditStudentInfo from "./Components/EditStudentInfo/EditStudentInfo";

function convertData(source) {
  let arr = [];
  let key = [];
  for (let i in source) {
    arr.push(source[i]);
    key.push(i);
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i]["id"] = key[i];
  }
  return arr;
}

function sortByTime(students) {
  return students.sort((a, b) => {
    return a["created"] - b["created"];
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      input: {
        name: "",
        birthYear: "",
        email: "",
        phone: ""
      },
      newStudent: {
        name: "",
        birthYear: "",
        email: "",
        phone: ""
      },
      currentEditStudent: {
        name: "",
        birthYear: "",
        email: "",
        phone: ""
      },
      isValid: {
        name: { status: false, message: "" },
        birthYear: { status: false, message: "" },
        email: { status: false, message: "" },
        phone: { status: false, message: "" }
      }
    };
  }

  getData = () => {
    axios
      .get(`https://student-rest-api.firebaseapp.com/api/v1/students`)
      .then(res => {
        const students = convertData(res.data.students);
        sortByTime(students);
        this.setState({ students });
      });
  };

  componentDidMount() {
    this.getData();
  }

  deleteStudent = id => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(
          `https://student-rest-api.firebaseapp.com/api/v1/students/${id}`
        )
        .then(res => {
          this.setState(prevState => {
            return {
              students: prevState.students.filter(student => student.id !== id)
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getInputValue = event => {
    const { name, value } = event.target;

    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      },
      newStudent: {
        ...this.state.input,
        [name]: value
      }
    });
  };

  addNewStudentHandler = async () => {
    let isValidFlag = true;
    const emailRegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const birthYearRegExp = /^\d{4}$/;

    const { newStudent, isValid } = this.state;

    // Name validate

    if (newStudent.name === "") {
      isValid.name.status = true;
      isValid.name.message = "Họ tên không được để trống";
      isValidFlag = false;
    } else {
      isValid.name.status = false;
      isValid.name.message = "";
    }

    // Birth Year validate

    if (newStudent.birthYear === "") {
      isValid.birthYear.status = true;
      isValid.birthYear.message = "Năm sinh không được để trống";
      isValidFlag = false;
    } else if (birthYearRegExp.exec(newStudent.birthYear) === null) {
      isValid.birthYear.status = true;
      isValid.birthYear.message = "Năm sinh không đúng định dạng";
      isValidFlag = false;
    } else {
      isValid.birthYear.status = false;
      isValid.birthYear.message = "";
    }

    // Email validate

    if (newStudent.email === "") {
      isValid.email.status = true;
      isValid.email.message = "Email không được để trống";
      isValidFlag = false;
    } else if (emailRegExp.exec(newStudent.email) === null) {
      isValid.email.status = true;
      isValid.email.message = "Email không đúng định dạng";
      isValidFlag = false;
    } else {
      isValid.email.status = false;
      isValid.email.message = "";
    }

    // Phone validate

    if (newStudent.phone === "") {
      isValid.phone.status = true;
      isValid.phone.message = "Số điện thoại không được để trống";
      isValidFlag = false;
    } else {
      isValid.phone.status = false;
      isValid.phone.message = "";
    }

    this.setState({
      isValid: { ...isValid }
    });

    if (isValidFlag === true) {
      await axios
        .post(`https://student-rest-api.firebaseapp.com/api/v1/students`, {
          ...this.state.newStudent
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
      await this.getData();
      this.props.history.push("/");
    }
  };

  editStudent = id => {
    const students = [...this.state.students];
    const currentStudent = students.find(student => student.id === id);
    this.setState({
      currentEditStudent: { ...currentStudent }
    });
  };

  navToAddNewStudent = () => {
    const freshObj = {
      name: "",
      birthYear: "",
      email: "",
      phone: ""
    };
    const isValidObj = {
      name: { status: false, message: "" },
      birthYear: { status: false, message: "" },
      email: { status: false, message: "" },
      phone: { status: false, message: "" }
    };
    this.setState({
      input: { ...freshObj },
      newStudent: { ...freshObj },
      isValid: { ...isValidObj }
    });
  };

  render() {
    const {
      students,
      input,
      newStudent,
      currentEditStudent,
      isValid,
      redirect
    } = this.state;

    return (
      <Container>
        <Switch>
          <Route path="/" exact>
            <StudentTable
              students={students}
              deleteStudent={this.deleteStudent}
              editStudent={this.editStudent}
              navToAddNewStudent={this.navToAddNewStudent}
            />
          </Route>
          <Route path="/add-new-student">
            <AddNewStudent
              getInputValue={this.getInputValue}
              inputData={input}
              newStudentData={newStudent}
              addNewStudentHandler={this.addNewStudentHandler}
              validation={isValid}
              redirect={redirect}
            />
          </Route>
          <Route path="/edit-student-info">
            <EditStudentInfo currentEditStudent={currentEditStudent} />
          </Route>
        </Switch>
      </Container>
    );
  }
}

export default withRouter(App);
