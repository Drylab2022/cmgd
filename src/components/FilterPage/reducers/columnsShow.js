import { GET_DEFAULT_COLUMNS_NAMES } from "../actions/types";

const columnsShow = (state = {}, action) => {
    switch (action.type) {
        case GET_DEFAULT_COLUMNS_NAMES:
            return action.payload;
        default:
            return state;
    }
};

export default columnsShow;
