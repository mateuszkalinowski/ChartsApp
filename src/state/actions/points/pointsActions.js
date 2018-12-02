import {ADD_POINT, REMOVE_POINT, EDIT_POINT} from '../../types';

export const addPoint = (point) => dispatch => {
    dispatch({
        type: ADD_POINT,
        payload: point
    })
}

export const removePoint = (id) => dispatch => {
    dispatch({
        type: REMOVE_POINT,
        payload: id
    })
}

export const editPoint = (id,newX,newY) => dispatch => {
    dispatch({
        type: EDIT_POINT,
        payload: {
            id,
            newX,
            newY
        }
    })
}