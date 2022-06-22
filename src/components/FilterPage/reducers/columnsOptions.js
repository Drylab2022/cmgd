import { GET_ALL_OPTIONS } from "../actions/types";

const columnsOptions = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_OPTIONS:
            return action.payload;
        default:
            return state;
    }
};

export default columnsOptions;
