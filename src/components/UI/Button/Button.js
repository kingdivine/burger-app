import React from 'react';
import styles from './Button.module.css';

const button = (props) =>{
    const classNames = [styles.Button, styles[props.buttonType]];
    return(
        <button 
            onClick={props.clicked}
            className={classNames.join(' ')}
            disabled={props.disabled}>
            {props.children}</button>
    );
}

export default button;