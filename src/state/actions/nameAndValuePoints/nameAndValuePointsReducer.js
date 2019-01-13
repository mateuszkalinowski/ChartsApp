import {ADD_NAMEANDVALUE_POINT, REMOVE_NAMEANDVALUE_POINT, EDIT_NAMEANDVALUE_POINT, REMOVE_ALL_NAMEANDVALUE_POINT} from "../../types";

const initialState = {
    points: {
        points: []
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_NAMEANDVALUE_POINT:
            let points = state.points.points;
            points.push(action.payload);
            // points.sort(function(a,b) {
            //     return a.x - b.x;
            // })
            return {
                ...state,
                points: {
                    'points': points
                }
            };
        case REMOVE_NAMEANDVALUE_POINT:
            points = state.points.points;
            points = points.filter(point => {
                return point.id !== action.payload
            });
            return {
                ...state,
                points: {
                    'points': points
                }
            };
        case EDIT_NAMEANDVALUE_POINT:
            points = state.points.points;
            points.forEach((point, id) => {
                if (point.id === action.payload.id) {
                    point.name = action.payload.newX;
                    point.value = action.payload.newY;
                }
            });
            return {
                ...state,
                points: {
                    'points': points
                }
            };
        case REMOVE_ALL_NAMEANDVALUE_POINT:
            return {
                ...state,
                points: {
                    points: []
                }
            };
        default:
            return state;
    }
}