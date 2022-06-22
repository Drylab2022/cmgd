import { GET_MODAL_STATUS } from "../actions/types";

const modalStatus = (state = false, action) => {
    switch (action.type) {
        case GET_MODAL_STATUS:
            return action.payload;
        default:
            return state;
    }
};

export default modalStatus;
