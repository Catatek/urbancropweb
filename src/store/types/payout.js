import { createActionType } from "../../redux_util";

export const FETCH_ACH_DETAILS = createActionType("FETCH_ACH_DETAILS");
export const ADD_ACH_DETAILS = createActionType("ADD_ACH_DETAILS");
export const FETCH_ACH_BALANCE = createActionType("FETCH_ACH_BALANCE");
export const UPDATE_ACH = createActionType("UPDATE_ACH");
export const FETCH_ACH_TRANSACTIONS = createActionType(
  "FETCH_ACH_TRANSACTIONS"
);
