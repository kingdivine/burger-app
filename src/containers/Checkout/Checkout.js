import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    state = {
        ingredients: {},
        price: 0
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients  = {};
        let price = 0;
        for(let param of query.entries()){
            console.log(param[0])
            if(param[0] === 'price'){
                price = +param[1];    
                continue;
            }
            ingredients[param[0]] = +param[1];
        }
        this.setState({
            ingredients: ingredients,
            price: price
        });
    }

    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    render(){
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients} 
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (
                            <ContactData 
                                ingredients={this.state.ingredients}
                                price={this.state.price} 
                                {...props}/>
                        )
                    }
                />
            </div>
        )
    }
}


export default Checkout;