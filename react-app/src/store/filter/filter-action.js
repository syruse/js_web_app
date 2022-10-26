import { createAction, FILTER_ACTION_TYPES } from "./filter-action-types";

export const applyFilter = (filter) => {
    return createAction(FILTER_ACTION_TYPES.APPLY_FILER, filter);
}
