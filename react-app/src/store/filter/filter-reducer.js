import { FILTER_ACTION_TYPES } from "./filter-action-types";
import Cookies from 'universal-cookie';


const INITIAL_STATE = {
    filter: [], // for example { field: "sim", op: "EQ", values: ["true"]}
};

// filter stored in coockie
const cookies = new Cookies();
const cookiesFilter = cookies.get('filter');
if (cookiesFilter) {
    INITIAL_STATE.filter = cookiesFilter;
}
console.debug("FILTER INITIAL_STATE " + JSON.stringify(INITIAL_STATE));

export const filterReducer = (state = INITIAL_STATE.filter, action) => {
    const { type, payload } = action;

    switch (type) {
        case FILTER_ACTION_TYPES.ADD_CRITERIA:
            console.debug("ADD_CRITERIA before " + JSON.stringify(state));
            // deep copy needed to refresh redux storage otherwise no reaction
            state = [...state];
            state.push(payload)
            console.debug("ADD_CRITERIA after " + JSON.stringify(state));
            cookies.set('filter', state);
            return state;
        case FILTER_ACTION_TYPES.CLEAR:
            // deep reset needed to refresh redux storage otherwise no reaction
            state = [];
            console.debug("CLEAR new state " + JSON.stringify(state));
            cookies.set('filter', state);
            return state;
        default:
            // by default for redux we need to return current state
            // throw new Error(`Unhandled type ${type} in cartReducer`);
            // !!! redux dispatch every single action to each reducer
            // if the state perisists then virtual-DOM doesn't trigger rerendering
            return state;
    }
};