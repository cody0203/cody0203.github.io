import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

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
      input: {},
      newStudent: {},
      currentEditStudent: {}
    };
  }

  componentDidMount() {
    axios
      .get(`https://student-rest-api.firebaseapp.com/api/v1/students`)
      .then(res => {
        const students = convertData(res.data.students);
        sortByTime(students);
        this.setState({ students });
      });
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
      }
    });
  };

  addNewStudentHandler = async () => {
    const { input } = this.state;
    this.setState({
      newStudent: { ...input }
    });
    await axios
      .post(`https://student-rest-api.firebaseapp.com/api/v1/students`, {
        ...this.state.newStudent
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  editStudent = id => {
    const students = [...this.state.students];
    const currentStudent = students.find(student => student.id === id);
    this.setState({
      currentEditStudent: { ...currentStudent }
    });
  };

  render() {
    const { students, input, newStudent, currentEditStudent } = this.state;
    return (
      <Container>
        <Switch>
          <Route path="/" exact>
            <StudentTable
              students={students}
              deleteStudent={this.deleteStudent}
              editStudent={this.editStudent}
            />
          </Route>
          <Route path="/add-new-student">
            <AddNewStudent
              getInputValue={this.getInputValue}
              inputData={input}
              newStudentData={newStudent}
              addNewStudentHandler={this.addNewStudentHandler}
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

export default App;
