import React, { useEffect, useRef } from "react";

import classes from "./Cockpit.css";
import AuthContext from "../../context/auth-context";

const cockpit = props => {
  const toggleBtnRef = useRef(null);

  useEffect(
    () => {
      console.log("[Cockpit.js] useEffect");
      // HTTP request...

      // clean up work in useEffect

      // const timer = setTimeout(() => {
      //   alert("Saved data to cloud");
      // }, 1000);
      // return () => {
      //   clearTimeout(timer)
      //   console.log("[Cockpit.js] clean up work with useEffect");
      // };

      // setTimeout(() => {
      //   alert("Saved data to cloud");
      // }, 1000);
      toggleBtnRef.current.click()
      return () => {
        console.log("[Cockpit.js] clean up work with useEffect");
      };
    },
    // execute this after evert persons props change
    // [props.persons]

    // execute this in component render first time
    []
  );

  // useEffect()

  const assignedClasses = [];
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <AuthContext.Consumer>
        {(context) => <button onClick={context.login}>Login</button>}
      </AuthContext.Consumer>
    </div>
  );
};

export default React.memo(cockpit);
