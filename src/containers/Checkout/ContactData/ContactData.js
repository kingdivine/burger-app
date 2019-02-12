import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';

class ContactData extends Component{
    state ={
        name:'',
        email:'',
        address: {
            street:'',
            postcode:''
        }
    }

    orderHandler = (event) =>{
        event.preventDefault();
    }

    render(){
        return(
            <div className={styles.ContactData}>
                <h4>Enter Contact Info</h4>
                    <form>
                        <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
                        <input className={styles.Input} type="email" name="email" placeholder="Email"/>
                        <input className={styles.Input} type="text" name="street" placeholder="Address Line 1"/>
                        <input className={styles.Input} type="text" name="postcode" placeholder="Postcode"/>
                        <Button buttonType="Success" clicked={this.orderHandler}>PLACE ORDER</Button>
                    </form>
            </div>
        )
    }
}

export default ContactData;