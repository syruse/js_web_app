import { createAction, CART_ACTION_TYPES } from "./cart-action-types";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

export const addItem = (cart) => {
    dispatch(createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, cart));
}