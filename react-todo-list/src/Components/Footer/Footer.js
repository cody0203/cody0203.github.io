import React from "react";
import "./Footer.css";
import Aux from "../../hoc/Aux";
import { Link } from "react-router-dom";

const footer = props => {
  const TodoItems = props.TodoItems;
  const isCheckedAllItems = TodoItems.filter(item => {
    return item.isComplete;
  });
  const ActiveItems = TodoItems.filter(item => {
    return !item.isComplete;
  });
  return (
    <Aux>
      {TodoItems.length !== 0 && (
        <div className="Footer">
          <div style={{ padding: "10px" }}>{ActiveItems.length} item left</div>
          <div className="Nav">
            <div>
              <Link to="/">All</Link>
            </div>
            <div>
              <Link to="/active">Active</Link>
            </div>
            <div>
              <Link to="/completed">Completed</Link>
            </div>
          </div>
          {isCheckedAllItems.length !== 0 ? (
            <button
              className="ClearCompleteBtn"
              onClick={props.ClearCompleteItems}
            >
              Clear complete
            </button>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </Aux>
  );
};

export default footer;
