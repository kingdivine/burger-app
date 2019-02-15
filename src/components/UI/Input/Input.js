import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    let inputElement =  null;
    let validationErrorMsg = null;
    const classNames = [styles.InputElement];

    if(props.invalid && props.shouldValidate){
        classNames.push(styles.Invalid);
        validationErrorMsg = (
            <p className={styles.ValidationErrorMessage}>
                Please enter a valid {props.elementConfig.type}
            </p>
        )
    }
    
    switch(props.elementType){
        case('input'):
            inputElement = (
                <input 
                    className={classNames.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}/>
            );
            break;
        case('textarea'):
            inputElement = (
                <textarea 
                    className={classNames.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}/>
            );
            break;
        case('select'):
            inputElement = (
                <select className={classNames.join(' ')} onChange={props.changed}>
                    {props.elementConfig.options.map ((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input className={classNames.join(' ')} {...props.elementConfig} value={props.value} />        
    }
    return(
        <div className={styles.Input}>
            <label className={styles.label}>{props.label}</label>
            {inputElement}
            {validationErrorMsg}
        </div>
    )
}

export default input;