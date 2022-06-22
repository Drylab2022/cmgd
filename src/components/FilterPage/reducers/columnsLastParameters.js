import { GET_LAST_PARAMETERS } from "../actions/types";

const lastParameters = (state = {}, action) => {
    switch (action.type) {
        case GET_LAST_PARAMETERS:
            return action.payload;
        default:
            return state;
    }
};

export default lastParameters;
