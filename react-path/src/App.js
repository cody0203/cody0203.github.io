import React, { Component } from 'react';

// Import React Hooks useState
// import React, { useState } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {name: "Cody", age: 24},
      {name: "Bi Villy", age: 25}
    ],
    otherState: "Some other value"
  }

  switchNameHandler = () => {
    // console.log('Clickable!')
    // DONT'T DO THIS: this.state.persons[0].name = "Pham Cong Dinh"
    this.setState({
      persons: [
        {name: "Pham Cong Dinh", age: 24},
        {name: "Bi Villy", age: 26}
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>It's really working!!!</p>
        <button className="switch-name" onClick={this.switchNameHandler}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}><small>My hobbies: Coding</small></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} />
      </div>
    );
  }
}

export default App;


// React Hooks alternative code for above

// const app = props => {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: "Cody", age: 24 },
//       { name: "Bi Villy", age: 25 }
//     ],
//     otherState: "Some other value"
//   })

//   // Another way to keeping another state after changing

//   const [otherState, setOtherState] = useState("Some other value");

//   console.log(personsState, otherState)

//   const switchNameHandler = () => {
//     // console.log('Clickable!')
//     // DONT'T DO THIS: this.state.persons[0].name = "Pham Cong Dinh"
//     setPersonsState({
//       persons: [
//         { name: "Pham Cong Dinh", age: 24 },
//         { name: "Bi Villy", age: 26 }
//       ],
//       // Keeping another state after changing
//       // otherState: personsState.otherState
//     })
//   }


//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//       <p>It's really working!!!</p>
//       <button className="switch-name" onClick={switchNameHandler}>Switch name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}><small>My hobbies: Coding</small></Person>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age} />
//     </div>
//   );
// }

// export default app;
