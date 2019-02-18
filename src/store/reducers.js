import * as actionTypes from './actions';

const intitalState = {
    ingredients: null,
    totalPrice: 4
}

const reducer = (state = intitalState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{

            };
        case actionTypes.REMOVE_INGREDIENT:
            return{

            };
        default:
            return state;
    }
};

export default reducer;