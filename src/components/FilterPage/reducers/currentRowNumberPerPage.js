import { GET_ROW_NUMBER_PER_PAGE } from "../actions/types";

const currentRowNumberPerPage = (state = 10, action) => {
    switch (action.type) {
        case GET_ROW_NUMBER_PER_PAGE:
            return action.payload;
        default:
            return state;
    }
};

export default currentRowNumberPerPage;
