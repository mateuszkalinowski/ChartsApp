import {
    ADD_NAMEANDVALUE_POINT,
    REMOVE_NAMEANDVALUE_POINT,
    EDIT_NAMEANDVALUE_POINT,
    REMOVE_ALL_NAMEANDVALUE_POINT
} from "../../types";

export const addPoint = (point) => dispatch => {
    dispatch({
        type: ADD_NAMEANDVALUE_POINT,
        payload: point
    })
};

export const removePoint = (id) => dispatch => {
    dispatch({
        type: REMOVE_NAMEANDVALUE_POINT,
        payload: id
    })
};

export const editPoint = (id,newX,newY) => dispatch => {
    dispatch({
        type: EDIT_NAMEANDVALUE_POINT,
        payload: {
            id,
            newX,
            newY
        }
    })
};

export const removeAllNameAndValuePoints = () => dispatch => {
    dispatch({
        type: REMOVE_ALL_NAMEANDVALUE_POINT,
        payload: {}
    })
};