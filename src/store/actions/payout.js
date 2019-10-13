import { createAction } from "../../redux_util";
import {
  ADD_ACH_DETAILS,
  FETCH_ACH_DETAILS,
  FETCH_ACH_BALANCE,
  UPDATE_ACH,
  FETCH_ACH_TRANSACTIONS
} from "../types/payout";
import {
  getACHDetails,
  postACH,
  getACHBalance,
  putACH,
  getACHTransactions
} from "../../services/api";

const fetchACHDetailsPending = createAction(FETCH_ACH_DETAILS.PENDING);
const fetchACHDetailsSuccess = createAction(
  FETCH_ACH_DETAILS.SUCCESS,
  "achDetails"
);
const fetchACHDetailsFailed = createAction(FETCH_ACH_DETAILS.FAILED, "error");
export const fetchACHDetailsAction = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetchACHDetailsPending());
    try {
      const res = await getACHDetails();
      resolve(dispatch(fetchACHDetailsSuccess(res.data.ach)));
    } catch (error) {
      reject(dispatch(fetchACHDetailsFailed(error)));
    }
  });

const addACHDetailsPending = createAction(ADD_ACH_DETAILS.PENDING);
const addACHDetailsSuccess = createAction(
  ADD_ACH_DETAILS.SUCCESS,
  "achDetails"
);
const addACHDetailsFailed = createAction(ADD_ACH_DETAILS.FAILED, "error");
export const addACHDetailsAction = ({ code }) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(addACHDetailsPending());
    try {
      const res = await postACH({ code });
      resolve(dispatch(addACHDetailsSuccess(res.data.ach)));
    } catch (error) {
      reject(dispatch(addACHDetailsFailed(error)));
    }
  });

const fetchACHBalancePending = createAction(FETCH_ACH_BALANCE.PENDING);
const fetchACHBalanceSuccess = createAction(
  FETCH_ACH_BALANCE.SUCCESS,
  "balance"
);
const fetchACHBalanceFailed = createAction(FETCH_ACH_BALANCE.FAILED, "error");
export const fetchACHBalanceAction = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetchACHBalancePending());
    try {
      const res = await getACHBalance();
      resolve(dispatch(fetchACHBalanceSuccess(res.data.balance)));
    } catch (error) {
      reject(dispatch(fetchACHBalanceFailed(error)));
    }
  });

const updateACHPending = createAction(UPDATE_ACH.PENDING);
const updateACHSuccess = createAction(UPDATE_ACH.SUCCESS);
const updateACHFailed = createAction(UPDATE_ACH.FAILED, "error");
export const updateACHAction = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(updateACHPending());
    try {
      const res = await putACH();
      dispatch(updateACHSuccess());
      resolve(res.data.url);
    } catch (error) {
      reject(dispatch(updateACHFailed(error)));
    }
  });

const fetchACHTransactionsPending = createAction(
  FETCH_ACH_TRANSACTIONS.PENDING
);
const fetchACHTransactionsSuccess = createAction(
  FETCH_ACH_TRANSACTIONS.SUCCESS,
  "transactions"
);
const fetchACHTransactionsFailed = createAction(
  FETCH_ACH_TRANSACTIONS.FAILED,
  "error"
);
export const fetchACHTransactions = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetchACHTransactionsPending());
    try {
      const res = await getACHTransactions();
      resolve(dispatch(fetchACHTransactionsSuccess(res.data.balance)));
    } catch (error) {
      reject(dispatch(fetchACHTransactionsFailed(error)));
    }
  });
