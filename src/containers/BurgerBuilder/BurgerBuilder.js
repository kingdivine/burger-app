import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';



export class BurgerBuilder extends Component{

    state = {
        purchasing : false,
    }

    componentDidMount(){
        this.props.onInitIngredient();
    }


    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            });
        }
        else{
            this.props.history.push('/auth?checkout=true');
        }
       
    }

    purchaseContinuedHandler = () =>{
        this.props.history.push('/checkout');
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
        let burgerAndControls = this.props.error ? <p>Could not load ingredients</p> : <Spinner/>;
        
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
                       disabledInfo={disabledInfo}
                       isAuthenticated={this.props.isAuthenticated}/>
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onIngredientAdded: (ingredient) => dispatch (burgerBuilderActions.addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch (burgerBuilderActions.removeIngredient(ingredient)),
        onInitIngredient: () => dispatch (burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));