import { combineReducers } from "redux-immutable";
import { httpReducer as http } from "./redux_util";
import auth from "./store/reducers/auth";
import data from "./store/reducers/data";
import payment from "./store/reducers/payment";

const appReducer = combineReducers({ auth, data, payment });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
