import { combineReducers } from "redux-immutable";
import { messages } from "./redux_util";
import auth from "./store/reducers/auth";
import data from "./store/reducers/data";
import payment from "./store/reducers/payment";
import payout from "./store/reducers/payout";

const appReducer = combineReducers({ auth, data, payment, messages, payout });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
