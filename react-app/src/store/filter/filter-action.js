import { createAction, FILTER_ACTION_TYPES } from "./filter-action-types";

export const addCriteria = (criteria) => {
    return createAction(FILTER_ACTION_TYPES.ADD_CRITERIA, criteria);
}

export const clear = () => {
    return createAction(FILTER_ACTION_TYPES.CLEAR);
}