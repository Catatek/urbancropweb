import { Map, fromJS } from "immutable";
import {
  USER_LOGIN
  //   USER_LOGOUT_SUCCESS,
  //   FETCH_PROFILE,
  //   CHECK_USER_LOGIN,
  //   USER_SIGNUP,
  //   UPDATE_PROFILE,
  //   UPDATE_AVATAR,
  //   UPDATE_FARM,
  //   FETCH_FARM,
} from "../types/auth";

export default (state = Map(), { type, ...action }) => {
  switch (type) {
    case USER_LOGIN.SUCCESS:
      state = state.set("authToken", action.authToken);

      return state;

    default:
      return state;
  }
};
