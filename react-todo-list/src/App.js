import React, { Component } from "react";
import "./App.css";
import TodoItems from "./Components/TodoItems/TodoItems";
import InsertItems from "./Components/InsertItems/InsertItems";
import Footer from "./Components/Footer/Footer";
import Aux from "./hoc/Aux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      TodoItems: [
      ],
      newItem: "",
      checkedAllItems: false
    };
  }

  onItemClicked = index => {
    return () => {
      const TodoItems = [...this.state.TodoItems];
      TodoItems[index].isComplete = !TodoItems[index].isComplete;
      let checkedAllItems = this.state.checkedAllItems;
      const isCheckedAllItems = TodoItems.every(item => {
        if (!item.isComplete) {
          return false;
        }
        return true;
      });
      checkedAllItems = isCheckedAllItems;
      this.setState({
        TodoItems: TodoItems,
        checkedAllItems: checkedAllItems
      });
    };
  };

  addItemHandler = event => {
    let keyCode = event.keyCode;
    let value = event.target.value;
    const TodoItems = [...this.state.TodoItems];
    const newItem = {
      title: value,
      isComplete: false
    };
    value = value.trim();
    if (!value || value === "") {
      return;
    }
    if (keyCode === 13) {
      TodoItems.unshift(newItem);
      this.setState({
        TodoItems: TodoItems,
        newItem: "",
        checkedAllItems: false
      });
    }
  };

  onChangeHandler = event => {
    this.setState({
      newItem: event.target.value
    });
  };

  checkAllItems = () => {
    let TodoItems = [...this.state.TodoItems];
    let checkedAllItems = this.state.checkedAllItems;
    for (let i = 0; i < TodoItems.length; i++) {
      TodoItems[i] = {
        title: TodoItems[i].title,
        isComplete: !checkedAllItems
      };
    }
    this.setState({
      TodoItems: TodoItems,
      checkedAllItems: !checkedAllItems
    });
  };

  deleteItem = index => {
    return () => {
      let TodoItems = [...this.state.TodoItems];
      if (window.confirm("Delete Item?")) {
        TodoItems.splice(index, 1);
      }
      let checkedAllItems = this.state.checkedAllItems;
      const isCheckedAllItems = TodoItems.every(item => {
        if (!item.isComplete) {
          return false;
        }
        return true;
      });
      checkedAllItems = isCheckedAllItems;
      this.setState({
        TodoItems: TodoItems,
        checkedAllItems: checkedAllItems
      });
    };
  };

  ClearCompleteItems = () => {
    const TodoItems = [...this.state.TodoItems];
    const CompleteItems = TodoItems.filter(item => {
      return !item.isComplete;
    });
    this.setState({
      TodoItems: CompleteItems
    });
  };

  render() {
    return (
      <Aux>
        <h1 style={{textAlign: 'center', color: 'rgba(175, 47, 47, 0.5)'}}>React Todo List</h1>
        <div className="App">
          <InsertItems
            addItem={this.addItemHandler}
            value={this.state.newItem}
            onChangeHandler={this.onChangeHandler}
            checkAllItems={this.checkAllItems}
            checkedAllItems={this.state.checkedAllItems}
            TodoItems={this.state.TodoItems}
          />
          {this.state.TodoItems.map((item, index) => (
            <TodoItems
              key={index}
              item={item}
              onClicked={this.onItemClicked(index)}
              deleteItem={this.deleteItem(index)}
            />
          ))}
          <Footer
            TodoItems={this.state.TodoItems}
            ClearCompleteItems={this.ClearCompleteItems}
          />
        </div>
      </Aux>
    );
  }
}

export default App;
