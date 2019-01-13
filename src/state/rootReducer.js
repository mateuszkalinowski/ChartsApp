import {combineReducers} from "redux";

import XandYPointsReducer from "./actions/points/pointsReducers";
import NameAndValueReducer from "./actions/nameAndValuePoints/nameAndValuePointsReducer";
import SelectionsReducer from "./actions/selections/selectionsReducer";

const appReducer = combineReducers({
    XandYPoints: XandYPointsReducer,
    NameAndValuePoints: NameAndValueReducer,
    Selections: SelectionsReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
