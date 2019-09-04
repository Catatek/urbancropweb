import { combineReducers } from "redux-immutable";
import { httpReducer as http } from "./redux_util";
import auth from "./store/reducers/auth";
import data from "./store/reducers/data";

const appReducer = combineReducers({ auth, data });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
