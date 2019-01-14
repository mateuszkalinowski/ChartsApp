import {
   SET_SELECTED_CHARTS_FAMILY,
    SET_X_LABEL,
    SET_Y_LABEL,
    SET_NAME_LABEL,
    SET_VALUE_LABEL,
    SET_HELP_VISIBLE
} from "../../types";

const initialState = {
    selections: {
        family: 'Liczbowe',
        xLabel: 'X',
        yLabel: 'Y',
        nameLabel: 'Nazwa',
        valueLabel: 'Wartość',
        helpVisible: false
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_CHARTS_FAMILY:
            return {
                ...state,
                selections: {
                    ...state.selections,
                    family: action.payload
                }
            };
        case SET_X_LABEL:
            return {
                ...state,
                selections: {
                    ...state.selections,
                    xLabel: action.payload
                }
            };
        case SET_Y_LABEL:
            return {
                ...state,
                selections: {
                    ...state.selections,
                    yLabel: action.payload
                }
            };
        case SET_NAME_LABEL:
            return {
                ...state,
                selections: {
                    ...state.selections,
                    nameLabel: action.payload
                }
            };
        case SET_VALUE_LABEL:
            return {
                ...state,
                selections: {
                    ...state.selections,
                    valueLabel: action.payload
                }
            };
        case SET_HELP_VISIBLE:
            return {
                ...state,
                selections: {
                    ...state.selections,
                    helpVisible: action.payload
                }
            }
        default:
            return state;
    }
}