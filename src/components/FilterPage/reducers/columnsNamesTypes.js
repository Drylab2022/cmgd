import { GET_COLUMNS_NAMES_TYPES } from "../actions/types";

const columnNamesTypes = (state = {}, action) => {
    switch (action.type) {
        case GET_COLUMNS_NAMES_TYPES:
            return action.payload;
        default:
            return state;
    }
};

export default columnNamesTypes;
