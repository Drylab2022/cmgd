import { GET_PARAMETERS_NUMBERS } from "../actions/types";

const parametersNumbers = (state = {}, action) => {
    switch (action.type) {
        case GET_PARAMETERS_NUMBERS:
            return action.payload;
        default:
            return state;
    }
};

export default parametersNumbers;
