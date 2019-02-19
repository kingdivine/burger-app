import * as actionTypes from './actions';

const intitalState = {
    ingredients: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad : 0.1,
    meat: 2.5,
    cheese: 0.5,
    bacon: 1
}

const reducer = (state = intitalState, action) =>{

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
                purchasable: updatePurchasableState(state.ingredients) + 1 > 0
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
                purchasable: updatePurchasableState(state.ingredients) - 1 > 0
            };
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