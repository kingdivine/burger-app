import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';  
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state ={
        orderForm:{
            name: 'Johnny Vegas',
            street: 'The Manor',
            Country: 'Belgium',                
            email:'jv@me.com'        
        },
        loading : false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Johnny Vegas',
                address:{
                    street: 'The Manor',
                    Country: 'Belgium'
                },
                email:'jv@me.com',
            }
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

    render(){
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input inputtype="input" type="email" name="email" placeholder="Email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Address Line 1"/>
                <Input inputtype="input" type="text" name="postcode" placeholder="Postcode"/>
                <Button buttonType="Success" clicked={this.orderHandler}>PLACE ORDER</Button>
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