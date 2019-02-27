import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
   
    componentDidMount(){
        this.props.onFetchOrders(this.props.authToken);
    }

    render(){
        let orders = <Spinner/>;

        if(!this.props.loading){
            orders = this.props.orders.map( order =>(
                <Order
                   key={order[0]}
                   price={order[1].price}
                   ingredients={order[1].ingredients}
               />
          )) 
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        orders : state.order.orders,
        loading: state.order.loading,
        authToken: state.auth.token
    };
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onFetchOrders: (authToken) => dispatch (actions.tryFetchOrders(authToken))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));