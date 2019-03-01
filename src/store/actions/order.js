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


const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const tryPurchaseBurger = (orderData, authToken) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + authToken, orderData)
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

export const tryFetchOrders = (authToken, userId) =>{
    return dispatch => {
        dispatch(fecthOrdersStart());
        const queryParams = '?auth=' + authToken + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
                .then(response =>{
                    const orders = Object.entries(response.data);
                    dispatch(fetchOrdersSuccess(orders));
                })
                .catch(error => { 
                    dispatch(fetchOrdersFail(error));
        });
   };
}