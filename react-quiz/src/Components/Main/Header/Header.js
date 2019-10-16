import React from "react";
import "./Header.css";

const header = props => {
  return (
    <div className="Header">
      <div className="LeftSide">
        <div className="ProgressBar">
          <span className="Percent">70%</span>
        </div>
      </div>
      <div className="RightSide">
        <div className="Time">1:00</div>
      </div>
    </div>
  );
};

export default header;
