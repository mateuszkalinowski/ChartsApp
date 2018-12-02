import { combineReducers } from "redux";

import pointsReducer from "./actions/points/pointsReducers";

const appReducer = combineReducers({
  points: pointsReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
