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
      currentStudent: {
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

  nameValidate = (name, flag) => {
    let isValid = true;
    if (name === "") {
      flag.status = true;
      flag.message = "Họ tên không được để trống";
      isValid = false;
    } else {
      flag.status = false;
      flag.message = "";
    }
    return isValid;
  };

  birthYearValidate = (birthYear, flag) => {
    let isValid = true;
    const birthYearRegExp = /^\d{4}$/;

    if (birthYear === "") {
      flag.status = true;
      flag.message = "Năm sinh không được để trống";
      isValid = false;
    } else if (birthYearRegExp.exec(birthYear) === null) {
      flag.status = true;
      flag.message = "Năm sinh không đúng định dạng";
      isValid = false;
    } else {
      flag.status = false;
      flag.message = "";
    }
    return isValid;
  };

  emailValidate = (email, flag) => {
    let isValid = true;
    const emailRegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (email === "") {
      flag.status = true;
      flag.message = "Email không được để trống";
      isValid = false;
    } else if (emailRegExp.exec(email) === null) {
      flag.status = true;
      flag.message = "Email không đúng định dạng";
      isValid = false;
    } else {
      flag.status = false;
      flag.message = "";
    }
    return isValid;
  };

  phoneValidate = (name, flag) => {
    let isValid = true;
    if (name === "") {
      flag.status = true;
      flag.message = "Số điện thoại không được để trống";
      isValid = false;
    } else {
      flag.status = false;
      flag.message = "";
    }
    return isValid;
  };

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
      currentStudent: {
        ...this.state.currentStudent,
        [name]: value
      }
    });
  };

  addNewStudentHandler = async () => {
    let isValidFlag = [];

    const { currentStudent, isValid } = this.state;

    isValidFlag.push(
      // Name validate

      this.nameValidate(currentStudent.name, isValid.name),

      // Birth Year validate

      this.birthYearValidate(currentStudent.birthYear, isValid.birthYear),

      // Email validate

      this.emailValidate(currentStudent.email, isValid.email),

      // Phone validate

      this.phoneValidate(currentStudent.phone, isValid.phone)
    );

    this.setState({
      isValid: { ...isValid }
    });

    if (!isValidFlag.includes(false)) {
      await axios
        .post(`https://student-rest-api.firebaseapp.com/api/v1/students`, {
          ...this.state.currentStudent
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
      currentStudent: { ...currentStudent }
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
      currentStudent: { ...freshObj },
      isValid: { ...isValidObj }
    });
  };

  saveStudentInfo = async () => {
    let isValidFlag = [];

    const { currentStudent, isValid } = this.state;

    isValidFlag.push(
      // Name validate

      this.nameValidate(currentStudent.name, isValid.name),

      // Birth Year validate

      this.birthYearValidate(currentStudent.birthYear, isValid.birthYear),

      // Email validate

      this.emailValidate(currentStudent.email, isValid.email),

      // Phone validate

      this.phoneValidate(currentStudent.phone, isValid.phone)
    );

    this.setState({
      isValid: { ...isValid }
    });

    if (!isValidFlag.includes(false)) {
      await axios
        .put(
          `https://student-rest-api.firebaseapp.com/api/v1/students/${currentStudent.id}`,
          { ...currentStudent }
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
      await this.getData();
      this.props.history.push("/");
    }
  };

  render() {
    const { students, currentStudent, isValid, redirect } = this.state;

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
              inputData={currentStudent}
              getInputValue={this.getInputValue}
              newStudentData={currentStudent}
              addNewStudentHandler={this.addNewStudentHandler}
              validation={isValid}
              redirect={redirect}
            />
          </Route>
          <Route path="/edit-student-info">
            <EditStudentInfo
              currentStudent={currentStudent}
              getInputValue={this.getInputValue}
              saveStudentInfo={this.saveStudentInfo}
            />
          </Route>
        </Switch>
      </Container>
    );
  }
}

export default withRouter(App);
