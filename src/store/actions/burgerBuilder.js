import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredient =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredient
    };
};

export const removeIngredient = ingredient =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredient
    };
};


const setIngredients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    };
}

export const initIngredients = () =>{
    return dispatch =>{
         axios.get('/ingredients.json')
            .then(response =>{
               dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
}