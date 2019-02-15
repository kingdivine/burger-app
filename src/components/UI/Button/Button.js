import React from 'react';
import styles from './Button.module.css';

const button = (props) =>{
    return(
        <button 
            onClick={props.clicked}
            className={[styles.Button, styles[props.buttonType]].join(' ')}>
            {props.children}</button>
    );
}

export default button;