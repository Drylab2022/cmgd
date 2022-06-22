import { GET_CURRENT_PAGE } from "../actions/types";

const currentPages = (state = 0, action) => {
    switch (action.type) {
        case GET_CURRENT_PAGE:
            return action.payload;
        default:
            return state;
    }
};

export default currentPages;
