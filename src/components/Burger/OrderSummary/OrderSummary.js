import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = props.ingredients;
    const listItems = Object.keys(ingredients).map((ingredient) =>{
        return(
            <li key={[ingredient]}> 
                <span style={{textTransform : 'capitalize'}}>{[ingredient]}</span> : {ingredients[ingredient]}
            </li>
        )
    })
    return(
        <>
            <h3>Your Order</h3>
            <ul>
                {listItems}
            </ul>
            <p> Price: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Proceed to Checkout?</p>
            <Button clicked={props.purchaseCancelled} buttonType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued}  buttonType="Success">CONTINUE</Button>
        </>
    )
}

export default orderSummary;