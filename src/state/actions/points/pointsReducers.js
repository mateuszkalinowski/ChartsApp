import {ADD_POINT, REMOVE_POINT, EDIT_POINT} from "../../types";

const initialState = {
    points: {
        points: []
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_POINT:
            let points = state.points.points;
            points.push(action.payload);
            points.sort(function(a,b) {
                return a.x - b.x;
            })
            return {
                ...state,
                points: {
                    'points': points
                }
            }
        case REMOVE_POINT:
            points = state.points.points;
            points = points.filter(point => {
                return point.id !== action.payload
            })
            return {
                ...state,
                points: {
                    'points': points
                }
            }
        case EDIT_POINT:
            points = state.points.points;
            points.forEach((point, id) => {
                if(point.id === action.payload.id) {
                    point.x = action.payload.newX;
                    point.y = action.payload.newY;
                }
            })
            return {
                ...state,
                points: {
                    'points': points
                }
            }
        default:
            return state;
    }
}