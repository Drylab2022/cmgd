import _ from "lodash";
import {
    ADD_COLUMN,
    DELETE_COLUMN,
    UPDATE_COLUMN,
    BACK_COLUMN,
} from "../actions/types";

const columnsCurrentParameters = (state = {}, action) => {
    switch (action.type) {
        case ADD_COLUMN:
            return action.payload;
        case DELETE_COLUMN:
            return _.omit(state, action.payload);
        case UPDATE_COLUMN:
            return {
                ...state,
                [action.payload.column]: action.payload.content,
            };
        case BACK_COLUMN:
            return action.payload;
        default:
            return state;
    }
};

export default columnsCurrentParameters;
