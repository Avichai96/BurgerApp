import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        }
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
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})


    };

    removeIngredientHandler = (type) => {
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
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0   // {salad: true, meat: false, ...}
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disableInfo} />
            </Aux>
        );
    }
}

export default BurgerBuilder;