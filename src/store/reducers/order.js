import * as actionTypes from '../actions/actionTypes';

const intitialState ={
    orders:[],
    loading: false,
}


const reducer = (state = intitialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START:
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder ={
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }    
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false
            }       
        default:
            return state    
    }
}

export default reducer;