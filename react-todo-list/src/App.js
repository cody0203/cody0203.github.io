import React, { Component } from "react";
import "./App.css";
import TodoItems from "./Components/TodoItems";

class App extends Component {
  constructor() {
    super();
    this.TodoItems = [
      { title: "Mua bim bim", isComplete: true },
      { title: "Đi chợ", isComplete: true },
      { title: "Đá bóng", isComplete: true }
    ];
  }
  render() {
    return (
      <div className="App">
        {this.TodoItems.map((item, index) => (
          <TodoItems key={index} item={item} />
        ))}
      </div>
    );
  }
}

export default App;
