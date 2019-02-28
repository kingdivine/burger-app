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
            dispatch(authLogout());
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error =>{
                dispatch(authFail(error.response.data.error.message));
            })
    }
}

export const authLogout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authCheckState =()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(new Date() > expirationDate){
                dispatch(authLogout());
            }
            else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId ));
                const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(expirationTime));
            }
        }
    }
}

