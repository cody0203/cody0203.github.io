import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";

const burger = props => {
  let transformIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredients key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformIngredients.length === 0) {
    transformIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
