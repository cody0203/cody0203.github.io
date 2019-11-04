import React from "react";
import classes from "./BuildController.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { ingredientsLabel: "Salad", type: "salad" },
  { ingredientsLabel: "Bacon", type: "bacon" },
  { ingredientsLabel: "Cheese", type: "cheese" },
  { ingredientsLabel: "Meat", type: "meat" }
];

const buildController = props => {
  return (
    <div className={classes.BuildController}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(control => {
        return (
          <BuildControl
            key={control.ingredientsLabel}
            ingredientsLabel={control.ingredientsLabel}
            added={() => props.ingredientsAdded(control.type)}
            subtracted={() => props.ingredientsSubtracted(control.type)}
            disabled={props.disabled[control.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.purchaseHandler}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildController;
