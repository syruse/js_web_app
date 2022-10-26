import { FILTER_ACTION_TYPES } from "./filter-action-types";

const INITIAL_STATE = {
    filter: [], // for example { field: "sim", op: "EQ", values: ["true"]}
};

console.debug("FILTER INITIAL_STATE " + JSON.stringify(INITIAL_STATE));

export const filterReducer = (state = INITIAL_STATE.filter, action) => {
    const { type, payload } = action;

    switch (type) {
        case FILTER_ACTION_TYPES.APPLY_FILER:
            state = payload;
            console.debug("APPLY_FILER " + JSON.stringify(state));
            return state;
        default:
            // by default for redux we need to return current state
            // throw new Error(`Unhandled type ${type} in cartReducer`);
            // !!! redux dispatch every single action to each reducer
            // if the state perisists then virtual-DOM doesn't trigger rerendering
            return state;
    }
};