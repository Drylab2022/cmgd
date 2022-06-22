import { GET_MODAL_CONTENT } from "../actions/types";

const modalContent = (state = "", action) => {
    switch (action.type) {
        case GET_MODAL_CONTENT:
            return action.payload;
        default:
            return state;
    }
};

export default modalContent;
