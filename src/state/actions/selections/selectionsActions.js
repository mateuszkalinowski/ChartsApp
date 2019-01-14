import {SET_SELECTED_CHARTS_FAMILY, SET_X_LABEL, SET_Y_LABEL, SET_NAME_LABEL, SET_VALUE_LABEL, SET_HELP_VISIBLE} from '../../types';

export const setSelectedChartsFamily = (family) => dispatch => {
    dispatch({
        type: SET_SELECTED_CHARTS_FAMILY,
        payload: family
    })
};

export const setXLabel = (newLabel) => dispatch => {
    dispatch({
        type: SET_X_LABEL,
        payload: newLabel
    })
};

export const setYLabel = (newLabel) => dispatch => {
    dispatch({
        type: SET_Y_LABEL,
        payload: newLabel
    })
};

export const setNameLabel = (newLabel) => dispatch => {
    dispatch({
        type: SET_NAME_LABEL,
        payload: newLabel
    })
};

export const setValueLabel = (newLabel) => dispatch => {
    dispatch({
        type: SET_VALUE_LABEL,
        payload: newLabel
    })
};

export const setHelpVisible = (visible) => dispatch => {
    dispatch({
        type: SET_HELP_VISIBLE,
        payload: visible
    })
}