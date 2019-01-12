import {combineReducers} from "redux";

import XandYPointsReducer from "./actions/points/pointsReducers";
import NameAndValueReducer from "./actions/nameAndValuePoints/nameAndValuePointsReducer";

const appReducer = combineReducers({
    XandYPoints: XandYPointsReducer,
    NameAndValueReducer: NameAndValueReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
