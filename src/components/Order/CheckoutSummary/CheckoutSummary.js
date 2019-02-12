import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) =>{
    return(
        <div className={styles.CheckoutSummary}>
            <div>
                <h1> Enjoy!</h1>
                <div className={styles.Burger}>
                    <Burger ingredients={props.ingredients} />
                </div>
                <Button buttonType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button buttonType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;