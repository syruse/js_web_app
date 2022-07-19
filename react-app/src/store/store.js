import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

import reduxCookiesMiddleware, {getStateFromCookies} from 'redux-cookies-middleware';


// structure
let initialState = {
    cart: null
};
// state to persist in cookies
const paths = {
    'cart': { name: 'cart_cookie' }
};
// read stored data in cookies and merge it with the initial state
initialState = getStateFromCookies(initialState, paths);
console.debug("initialState from COOCKIE " + JSON.stringify(initialState));

const middleWares = [logger, reduxCookiesMiddleware];

const composedEnchancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, initialState, composedEnchancers);
