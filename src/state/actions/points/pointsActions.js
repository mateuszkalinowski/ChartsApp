import {ADD_XY_POINT, REMOVE_XY_POINT, EDIT_XY_POINT, REMOVE_ALL_XY_POINTS} from '../../types';

export const addPoint = (point) => dispatch => {
    dispatch({
        type: ADD_XY_POINT,
        payload: point
    })
};

export const removePoint = (id) => dispatch => {
    dispatch({
        type: REMOVE_XY_POINT,
        payload: id
    })
};

export const editPoint = (id,newX,newY) => dispatch => {
    dispatch({
        type: EDIT_XY_POINT,
        payload: {
            id,
            newX,
            newY
        }
    })
};

export const removeAllXYPoints = () => dispatch => {
    dispatch({
        type: REMOVE_ALL_XY_POINTS,
        payload: {}
    })
};