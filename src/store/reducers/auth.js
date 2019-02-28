import * as actionTypes from '../actions/actionTypes';

const intialState ={
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = intialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            }  
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading : false
            }   
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token: null,
                userId: null
            }      
        default:
            return state;
    }
}

export default reducer;