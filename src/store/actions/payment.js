import { createAction } from "../../redux_util";
import {
  FETCH_CARDS,
  DELETE_CARD,
  ADD_CARD,
  MODIFY_CARD
} from "../types/payment";
import { getCard, deleteCard, postCard, putCard } from "../../services/api";

const fetchCardsRequest = createAction(FETCH_CARDS.PENDING);
const fetchCardsSuccess = createAction(FETCH_CARDS.SUCCESS, "card");
const fetchCardsFailed = createAction(FETCH_CARDS.FAILED, "error");
export const fetchCardsAction = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetchCardsRequest());
    try {
      const res = await getCard();
      resolve(dispatch(fetchCardsSuccess(res.data.card)));
    } catch (error) {
      reject(dispatch(fetchCardsFailed(error)));
    }
  });

const deleteCardRequest = createAction(DELETE_CARD.PENDING);
const deleteCardSuccess = createAction(DELETE_CARD.SUCCESS, "card");
const deleteCardFailed = createAction(DELETE_CARD.FAILED, "error");
export const deleteCardAction = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(deleteCardRequest());
    try {
      const res = await deleteCard();
      resolve(dispatch(deleteCardSuccess(res.data.card)));
    } catch (error) {
      reject(dispatch(deleteCardFailed(error)));
    }
  });

const addCardRequest = createAction(ADD_CARD.PENDING);
const addCardSuccess = createAction(ADD_CARD.SUCCESS, "card");
const addCardFailed = createAction(ADD_CARD.FAILED, "error");
export const addCardAction = stripeToken => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(addCardRequest());
    try {
      const res = await postCard(stripeToken);
      resolve(dispatch(addCardSuccess(res.data.card)));
    } catch (error) {
      reject(dispatch(addCardFailed(error)));
    }
  });

const modifyCardRequest = createAction(MODIFY_CARD.PENDING);
const modifyCardSuccess = createAction(MODIFY_CARD.SUCCESS, "card");
const modifyCardFailed = createAction(MODIFY_CARD.FAILED, "error");
export const modifyCardAction = stripeToken => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(modifyCardRequest());
    try {
      const res = await putCard(stripeToken);
      resolve(dispatch(modifyCardSuccess(res.data.card)));
    } catch (error) {
      reject(dispatch(modifyCardFailed(error)));
    }
  });
