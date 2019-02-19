import React, {Component} from 'react';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
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
                    ingredients={this.props.ingredients} 
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);