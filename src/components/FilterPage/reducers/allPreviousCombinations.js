import { GET_ALL_PREVIOUS_COMBINATIONS } from "../actions/types";

const allCombinations = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_PREVIOUS_COMBINATIONS:
            return action.payload;
        default:
            return state;
    }
};

export default allCombinations;
