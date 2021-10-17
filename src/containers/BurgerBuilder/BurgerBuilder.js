import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
        }
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey]
        }).reduce((sum, element) => {
            return sum + element;
        },0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCont = this.state.ingredients[type];
        const updatedCont = oldCont + 1;
        const updateIngredients = {
            ...this.state.ingredients,
        };
        updateIngredients[type] = updatedCont;
        const priceAddition  = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }
    
    removeIngredientHandler = ( type ) => {
        const oldCont = this.state.ingredients[type];
        if(oldCont <= 0) {
            return;
        };
        const updatedCont = oldCont - 1;
        const updateIngredients = {
            ...this.state.ingredients,
        };
        updateIngredients[type] = updatedCont;
        const priceDeduction  = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuelHandler = () => {
        alert('You continue');
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0   // {salad: true, meat: false, ...}
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice} 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinuelHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disableInfo}
                purchasable={this.state.purchasable} 
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;