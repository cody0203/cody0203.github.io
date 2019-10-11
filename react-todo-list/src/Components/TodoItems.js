import React, { Component } from "react";
import "./TodoItems.css";
let classNames = require("classnames");

class TodoItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    const className = classNames("TodoItems", {
      "TodoItems-complete": item.isComplete
    });
    return (
      <div className={className}>
        <p>{item.title}</p>
      </div>
    );
  }
}

export default TodoItems;
