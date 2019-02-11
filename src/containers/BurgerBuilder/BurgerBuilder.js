import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 0.1,
    meat: 2.5,
    cheese: 0.5,
    bacon: 1
}

class BurgerBuilder extends Component{

    state = {
        ingredients : null,        
        totalPrice : 4,
        purchasable: false,
        purchasing : false,
        loading: false,
        error: false
    }


    componentDidMount(){
        axios.get('https://my-burger-e398e.firebaseio.com/ingredients.json')
            .then(response =>{
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type]  + 1;
        
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients : updatedIngredients,
            totalPrice : updatedPrice
        });
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] === 0){ return; }

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type]  - 1;
        
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients : updatedIngredients,
            totalPrice : updatedPrice
        });
        this.updatePurchasableState(updatedIngredients);
    }

    updatePurchasableState(ingredients){
        const sumOfIngredients = Object.keys(ingredients).reduce(
            (total, ingredient) => total + ingredients[ingredient],
            0
        );
        this.setState({
            purchasable : sumOfIngredients > 0 ? true : false
        });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseContinuedHandler = () =>{
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'Johnny Vegas',
                address:{
                    street: 'The Manor',
                    Country: 'Belgium'
                },
                email:'jv@me.com',
            }
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false})
        })
        .catch(error => console.log(error));
    }

    purchaseCancelledHandler = () =>{
        this.setState({
            purchasing: false
        });
    }
     
    render(){
        let disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] === 0);
        }

        let orderSummary = <Spinner/>;
        let burgerAndControls = this.state.error ? <p>Could not load ingredients</p> : <Spinner/>;
        
        if(this.state.loading){
            orderSummary = (<OrderSummary 
                ingredients={this.state.ingredients} 
                price={this.state.totalPrice}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCancelled={this.purchaseCancelledHandler}
            />);
        }
        
        if(this.state.ingredients){
            burgerAndControls = (
                <>
                   <Burger ingredients={this.state.ingredients}/>
                      <BuildControls 
                       price={this.state.totalPrice}
                       ingredientAdded={this.addIngredientHandler}
                       ingredientRemoved={this.removeIngredientHandler}
                       ordered={this.purchaseHandler}
                       purchasable={this.state.purchasable}
                       disabledInfo={disabledInfo}/>
                </>
           );
        }
        return(
            <>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelledHandler} > 
                   {orderSummary}
                </Modal>
                {burgerAndControls}
            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);