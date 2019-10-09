import React from "react";
import Radium from "radium";

const person = props => {
  let style = {
    "@media (max-width: 500px)": {
      color: "red"
    }
  };
  return (
    <div>
      <p style={style} onClick={props.click}>
        I'm {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
    </div>
  );
};

export default Radium(person);
