import { createAction, CART_ACTION_TYPES } from "./cart-action-types";

export const addItem = (cart) => {
    return createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, cart);
}