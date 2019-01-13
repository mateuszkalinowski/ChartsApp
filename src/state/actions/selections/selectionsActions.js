import {SET_SELECTED_CHARTS_FAMILY} from '../../types';

export const setSelectedChartsFamily = (family) => dispatch => {
    dispatch({
        type: SET_SELECTED_CHARTS_FAMILY,
        payload: family
    })
};
