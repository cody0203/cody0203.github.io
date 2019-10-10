import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css"

const burger = (props) => {
  const transformIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, index) => {
      return <BurgerIngredients key={igKey + index} type={igKey} />
    })
  })
  console.log(transformIngredients)
  return(
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  )
}

export default burger;