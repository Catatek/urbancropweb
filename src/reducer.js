import { combineReducers } from "redux-immutable";
import { routerReducer } from "react-router-redux";
import { httpReducer as http } from "./redux_util";
import auth from "./store/reducers/auth";

const appReducer = combineReducers({ auth });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
