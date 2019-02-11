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
                <Button btnType="Danger" clicked="">CANCEL</Button>
                <Button btnType="Success" clicked="">CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;