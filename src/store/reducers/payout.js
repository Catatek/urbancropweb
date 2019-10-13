import { Map, fromJS } from "immutable";
import {
  ADD_ACH_DETAILS,
  FETCH_ACH_DETAILS,
  FETCH_ACH_BALANCE,
  UPDATE_ACH,
  FETCH_ACH_TRANSACTIONS
} from "../types/payout";

export default (state = Map(), { type, ...action }) => {
  switch (type) {
    case ADD_ACH_DETAILS.PENDING:
      return state.set("isAddingACH", true);
    case ADD_ACH_DETAILS.SUCCESS:
      return state
        .set("achDetails", fromJS(action.achDetails))
        .set("isAddingACH", false);
    case ADD_ACH_DETAILS.FAILED:
      return state.set("isAddingACH", false);
    case FETCH_ACH_DETAILS.PENDING:
      return state.set("isFetchingACHDetails", true);
    case FETCH_ACH_DETAILS.SUCCESS:
      return state
        .set("achDetails", fromJS(action.achDetails))
        .set("isFetchingACHDetails", false);
    case FETCH_ACH_DETAILS.FAILED:
      return state
        .set("isFetchingACHDetails", false)
        .set("achDetails", undefined);
    case FETCH_ACH_BALANCE.PENDING:
      return state.set("isFetchingACHBalance", true);
    case FETCH_ACH_BALANCE.SUCCESS:
      return state
        .set("achBalance", action.balance)
        .set("isFetchingACHBalance", false);
    case FETCH_ACH_BALANCE.FAILED:
      return state
        .set(("error", action.error))
        .set("isFetchingACHBalance", false)
        .set("achBalance", undefined);
    case UPDATE_ACH.PENDING:
      return state.set("isUpdatingACH", true);
    case UPDATE_ACH.SUCCESS:
      return state.set("isUpdatingACH", false);
    case UPDATE_ACH.FAILED:
      return state.set(("error", action.error)).set("isUpdatingACH", false);
    case FETCH_ACH_TRANSACTIONS.SUCCESS:
      return state.set("transactions", fromJS(action.data));

    default:
      return state;
  }
};
