import * as actionTypes from '../actions/actionTypes';

const intitalState = {
    ingredients: null,
    totalPrice: 4, 
    error: false
}

const INGREDIENT_PRICES = {
    salad : 0.1,
    meat: 2.5,
    cheese: 0.5,
    bacon: 1
}

const addIngredient = (state, action) =>{
    return{
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
        purchasable: updatePurchasableState(state.ingredients) + 1 > 0
    };
}

const removeIngredient = (state, action) =>{
    return{
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
        purchasable: updatePurchasableState(state.ingredients) - 1 > 0
    };
}

const setIngredients = (state, action) =>{
    return{
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    };
}


const reducer = (state = intitalState, action) =>{

    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }    
        default:
            return state;
    }
};

const updatePurchasableState = (ingredients) => {
    const sumOfIngredients = Object.keys(ingredients).reduce(
        (total, ingredient) => total + ingredients[ingredient],
        0
    );
    return sumOfIngredients > 0
}

export default reducer;