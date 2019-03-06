import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
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
        },
        isSignUp: true
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
        this.props.onAuth(this.state.controls.email.value,
                        this.state.controls.password.value,
                        this.state.isSignUp )
    }

    switchAuthMode = () =>{
        this.setState( prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
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
                   {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
                </Button>
            </form>
        )
        if(this.props.loading){
            form = <Spinner/>
        }
        const errorMsg = this.props.error ? (<p>Error authenticating: {this.props.error}</p>) : null;

        const redirectPath = new URLSearchParams(this.props.location.search).get('checkout') ? '/checkout' : '/';
        let redirect = null;
        console.log("is auth: " + this.props.isAuthenticated);
        if(this.props.isAuthenticated){
            redirect = <Redirect to={redirectPath}/>
        }
        return(
            <div className={styles.Auth}>
                {redirect}
                {errorMsg}
                {form}
                <Button 
                    buttonType="Danger" 
                    clicked={this.switchAuthMode}>
                    SWITCH TO  {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (email, password, isSignUp) => dispatch (actions.tryAuth(email, password, isSignUp))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);