import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
   const ingredients = [];
   for (let ingredientName in props.ingredients){
       ingredients.push(
           {
               name: ingredientName,
               amount: props.ingredients[ingredientName]
           }
       )
   }

   const ingredientOutput = ingredients.map(ingredient => {
       return(
           <span className={styles.Ingredient} key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
       )
   })
   console.log(ingredientOutput);
    return(
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>${Number.parseFloat(props.price.toFixed(2))}</strong> </p>
        </div>
    )
}

export default order;