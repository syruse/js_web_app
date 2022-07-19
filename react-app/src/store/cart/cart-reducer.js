import { CART_ACTION_TYPES } from "./cart-action-types";
import Cookies from 'universal-cookie';

const INITIAL_STATE = {
    cart: [{productId: -1, amount: 0}],
};

// cart stored in coockie
const cookies = new Cookies();
const cookiesCart = cookies.get('cart');
if (cookiesCart) {
    INITIAL_STATE.cart = cookiesCart;
}
console.debug("INITIAL_STATE " + JSON.stringify(INITIAL_STATE));

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            console.debug("ADD_ITEM_TO_CART " + JSON.stringify(state));
            state.cart = [...state.cart, payload];
            cookies.set('cart', state.cart);
            // deep copy needed to refresh redux storage otherwise no reaction
            return Object.assign({}, state);
        default:
            // by default for redux we need to return current state
            // throw new Error(`Unhandled type ${type} in cartReducer`);
            // !!! redux dispatch every single action to each reducer
            // if the state perisists then virtual-DOM doesn't trigger rerendering
            return state;
    }
};