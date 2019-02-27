import * as actionTypes from './actionTypes'
import axios from 'axios';

const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
}

const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
}


const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const tryAuth = (email,password, isNewUser) =>{
    const param = isNewUser ? 'signupNewUser' : 'verifyPassword';
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'+ param +'?key=AIzaSyCfCd_DLbjE5v9dM7BAcHxeJ3Of8VvlHbg';
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then( response =>{
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error =>{
                dispatch(authFail(error.response.data.error.message));
            })
    }
}

export const logout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    };
}

