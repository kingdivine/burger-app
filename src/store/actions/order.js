import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderId, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    };
}

const purchaseBurgerFail = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const tryPurchaseBurger = (orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    };
}

const fetchOrdersSuccess = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}

const fetchOrdersFail = (error) =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}

const fecthOrdersStart = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_START,
    };
}

export const tryFetchOrders = () =>{
    return dispatch => {
        dispatch(fecthOrdersStart());
        axios.get('/orders.json')
                .then(response =>{
                    const orders = Object.entries(response.data);
                    dispatch(fetchOrdersSuccess(orders));
                })
                .catch(error => { 
                    dispatch(fetchOrdersFail(error));
        });
   };
}