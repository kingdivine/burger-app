import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () =>{
    let initialState;
    beforeEach(()=>{
        initialState={
            token: null,
            userId: null,
            error: null,
            loading: false
        }
    })
    it('should return default state initially', () =>{
        expect(reducer(undefined, {})).toEqual(initialState);
    })
    it('should return state with token and user id on auth success', () =>{
        expect(reducer(initialState,
                        {
                            type: actionTypes.AUTH_SUCCESS,
                            token: 'token-xyz',
                            userId: 'userId-123'
                        })).toEqual(
            {
                token: 'token-xyz',
                userId: 'userId-123',
                error: null,
                loading: false}
        )
    })
} )