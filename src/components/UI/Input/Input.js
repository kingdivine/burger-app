import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    let inputElement =  null;
    switch(props.inputtype){
        case('input'):
            inputElement = <input className={styles.InputElement} {...props}/>;
            break;
        case('textarea'):
            inputElement = <textarea {...props} />;
            break;
        default:
            inputElement = <input {...props}/>        
    }
    return(
        <div className={styles.Input}>
            <label className={styles.label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;