import {
    ADD_XY_POINT,
    REMOVE_XY_POINT,
    EDIT_XY_POINT,
    REMOVE_ALL_NAMEANDVALUE_POINT,
    REMOVE_ALL_XY_POINTS
} from "../../types";

const initialState = {
    points: {
        points: []
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_XY_POINT:
            let points = state.points.points;
            points.push(action.payload);
            points.sort(function (a, b) {
                return a.x - b.x;
            });
            return {
                ...state,
                points: {
                    'points': points
                }
            };
        case REMOVE_XY_POINT:
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
        case EDIT_XY_POINT:
            points = state.points.points;
            points.forEach((point, id) => {
                if (point.id === action.payload.id) {
                    point.x = action.payload.newX;
                    point.y = action.payload.newY;
                }
            });
            return {
                ...state,
                points: {
                    'points': points
                }
            };
        case REMOVE_ALL_XY_POINTS:
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