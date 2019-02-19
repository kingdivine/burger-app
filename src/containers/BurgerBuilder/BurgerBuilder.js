import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component{

    state = {
        purchasable: false,
        purchasing : false,
        loading: false,
        error: false
    }


    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then(response =>{
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({error: true});
        //     });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseContinuedHandler = () =>{
        let queryParams = Object.keys(this.props.ingredients).map( (ingredient) => {
           return (encodeURIComponent(ingredient) + '=' + this.props.ingredients[ingredient])
        })
        queryParams.push('price=' + this.props.totalPrice);
        
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryParams.join('&')
        });
    }

    purchaseCancelledHandler = () =>{
        this.setState({
            purchasing: false
        });
    }
     
    render(){
        let disabledInfo = {...this.props.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] === 0);
        }

        let orderSummary = <Spinner/>;
        let burgerAndControls = this.state.error ? <p>Could not load ingredients</p> : <Spinner/>;
        
        if(this.state.purchasing){
            orderSummary = (<OrderSummary 
                ingredients={this.props.ingredients} 
                price={this.props.totalPrice}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCancelled={this.purchaseCancelledHandler}
            />);
        }
        
        if(this.props.ingredients){
            burgerAndControls = (
                <>
                   <Burger ingredients={this.props.ingredients}/>
                      <BuildControls 
                       price={this.props.totalPrice}
                       ingredientAdded={this.props.onIngredientAdded}
                       ingredientRemoved={this.props.onIngredientRemoved}
                       ordered={this.purchaseHandler}
                       purchasable={this.props.purchasable}
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

const mapStateToProps = (state) =>{
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    };
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onIngredientAdded: (ingredient) => dispatch ({type: actionTypes.ADD_INGREDIENT, ingredient:ingredient }),
        onIngredientRemoved: (ingredient) => dispatch ({type: actionTypes.REMOVE_INGREDIENT, ingredient:ingredient })
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));