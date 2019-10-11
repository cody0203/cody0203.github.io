import React from "react";
import "./InsertItems.css";
import CheckAllItems from "../../assets/tick.svg";

const insertItems = props => {
  const checkedAllItems = props.checkedAllItems;
  const TodoItems = props.TodoItems;
  let classNames = "checkAllItem";
  if (checkedAllItems) {
    classNames = `${classNames}active`;
  }
  return (
    <div className="InsertItems">
      {TodoItems.length !== 0 && (
        <img
          src={CheckAllItems}
          width={30}
          alt="check-all"
          onClick={props.checkAllItems}
          className={classNames}
        />
      )}

      <input
        className="Input"
        placeholder="Add a new item"
        onKeyUp={props.addItem}
        value={props.value}
        onChange={props.onChangeHandler}
      />
    </div>
  );
};

export default insertItems;
