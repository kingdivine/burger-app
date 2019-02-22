import React, {Component} from 'react';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ingredients){
            summary = (
                <>
                    <CheckoutSummary
                        ingredients={this.props.ingredients} 
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </>
            )
        }
        return(
            <div>
               {summary}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);