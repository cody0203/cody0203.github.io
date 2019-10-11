import React from "react";
import "./Footer.css";
import Aux from "../../hoc/Aux";

const footer = props => {
  const TodoItems = props.TodoItems;
  const isCheckedAllItems = TodoItems.filter(item => {
    return item.isComplete;
  });
  return (
    <Aux>
      {TodoItems.length !== 0 && (
        <div className="Footer">
          <div>{TodoItems.length} item left</div>
          {isCheckedAllItems.length !== 0 && (
            <button
              className="ClearCompleteBtn"
              onClick={props.ClearCompleteItems}
            >
              Clear complete
            </button>
          )}
        </div>
      )}
    </Aux>
  );
};

export default footer;
