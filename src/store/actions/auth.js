import * as actionTypes from './actionTypes'


const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (response) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        response: response
    }
}


const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL
    }
}

export const tryAuth = (response) =>{
    return dispatch =>{
        dispatch(authStart());
    }
}