import { GET_CURRENT_TABLE } from "../actions/types";

const currentTable = (state = {}, action) => {
    switch (action.type) {
        case GET_CURRENT_TABLE:
            return action.payload;
        default:
            return state;
    }
};

export default currentTable;
