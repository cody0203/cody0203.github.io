import React, { Component } from "react";
import "./TodoItems.css";
import classNames from "classnames";
import checkComplete from "../../assets/check.svg";
import check from "../../assets/check-complete.svg";
import close from "../../assets/close.svg";

class TodoItems extends Component {
  render() {
    const { item, onClicked, deleteItem } = this.props;
    let url = check;
    if (item.isComplete) {
      url = checkComplete;
    }
    const className = classNames("TodoItems", {
      "TodoItems-complete": item.isComplete
    });
    return (
      <div className={className}>
        <img src={url} width={32} onClick={onClicked} alt="check" />
        <div className="TodoItemContent">
          <p> {item.title}</p>
          <img src={close} width={16} alt="close" className="close"
          onClick={deleteItem} />
        </div>
      </div>
    );
  }
}

export default TodoItems;
