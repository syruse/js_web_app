import { CART_ACTION_TYPES } from "./cart-action-types";

const INITIAL_STATE = {
    cart: null,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            return { ...state, cart: payload };
        default:
            // by default for redux we need to return current state
            // throw new Error(`Unhandled type ${type} in cartReducer`);
            // !!! redux dispatch every single action to each reducer
            // if the state perisists then virtual-DOM doesn't trigger rerendering
            return state;
    }
};