import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';  
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state ={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'name',
                    placeholder: 'Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
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
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'street',
                    placeholder: 'Address Line 1'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'postcode',
                    placeholder: 'Postcode'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'collection', displayValue:'Order for collection'},
                        {value: 'delivery', displayValue: 'Deliver to me'}
                    ]
                },
                value:'collection',
                valid:true
            },
        },
        formIsValid: false,
        loading : false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        })
        const formData = {};
        for(let inputId in this.state.orderForm){
            formData[inputId] = this.state.orderForm[inputId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            contactData: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading:false})
            console.log(error)
        });
    }


    inputChangedHandler = (event, inputId) =>{
        const newValue = event.target.value;
        const isFieldValid = this.checkFieldValidity(newValue, this.state.orderForm[inputId].validation);
        const formIsValid = isFieldValid && this.checkFormValidity();
        this.setState(
            prevState => ({
                orderForm: {
                    ...prevState.orderForm,
                    [inputId]:{
                        ...prevState.orderForm[inputId],
                        value: newValue,
                        valid: isFieldValid,
                        touched: true
                    },
                },
                formIsValid: formIsValid
            })
        );
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

    checkFormValidity = () =>{
        const validities = Object.entries(this.state.orderForm).map((field) =>(
            field[1].valid
        ));
        let allValid = validities.every((validity) => (
            validity === true
        ));
        return allValid;
    }

    render(){
        const formElements = Object.entries(this.state.orderForm).map((field) =>(
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
            <form onSubmit={this.orderHandler}>
                {formElements}
                <Button 
                    buttonType="Success" 
                    disabled={!this.state.formIsValid}>
                    PLACE ORDER
                </Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={styles.ContactData}>
                <h4>Enter Contact Info</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;