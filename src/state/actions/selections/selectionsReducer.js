import {
   SET_SELECTED_CHARTS_FAMILY
} from "../../types";

const initialState = {
    selections: {
        family: 'Liczbowe'
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_CHARTS_FAMILY:
            return {
                ...state,
                selections: {
                    family: action.payload
                }
            };
        default:
            return state;
    }
}