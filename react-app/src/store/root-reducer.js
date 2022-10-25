import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart-reducer";
import { filterReducer } from "./filter/filter-reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    filter: filterReducer
});