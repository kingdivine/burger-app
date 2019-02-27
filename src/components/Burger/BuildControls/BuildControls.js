import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const controls = [
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'}
]

const buildControls = (props) => {
    return(
        <div className={styles.BuildControls}>
            <p> Current price: <strong>${props.price.toFixed(2)}</strong></p>
            {
                controls.map((control) =>{
                    return <BuildControl 
                                key={control.label}
                                label={control.label}
                                added={() => props.ingredientAdded(control.type)}
                                removed={() => props.ingredientRemoved(control.type)} 
                                disabled={props.disabledInfo[control.type]}/>
                })
            }
            <button className={styles.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuthenticated? 'Order Now' : 'Sign in to order' }</button>
        </div>
    )
}

export default buildControls;