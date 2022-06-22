import { GET_CURRENT_DATA_NUMBER } from "../actions/types";

const currentDataNumber = (state = 0, action) => {
    switch (action.type) {
        case GET_CURRENT_DATA_NUMBER:
            return action.payload;
        default:
            return state;
    }
};

export default currentDataNumber;
