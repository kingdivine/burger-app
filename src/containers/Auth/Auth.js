import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from '../Auth/Auth.module.css';

import * as actions from '../../store/actions/index';

class Auth extends Component{
    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    inputChangedHandler = (event, controlName) =>{
        const updatedControls= {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkFieldValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({
            controls: updatedControls
        })
    }

    checkFieldValidity = (value, rules) =>{
        let isValid = false;
        if(rules && rules.required){
            isValid = value.trim() !== '';
        }
        if(rules && rules.minLength && isValid){
            isValid = value.length >= rules.minLength;
        }
        return isValid;
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value )
    }

    render(){
        const formElements = Object.entries(this.state.controls).map((field) =>(
            <Input 
                key={field[0]} 
                elementType={field[1].elementType}
                elementConfig={field[1].elementConfig}
                value={field[1].value}
                invalid={field[1].touched &&!field[1].valid}
                shouldValidate={field[1].validation}
                changed={(event) =>this.inputChangedHandler(event, field[0])} />
        ));
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements}
                <Button 
                    buttonType="Success" >
                    SIGN IN
                </Button>
            </form>
        )
        return(
            <div className={styles.Auth}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{

    };
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (email, password) => dispatch (actions.tryAuth(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);