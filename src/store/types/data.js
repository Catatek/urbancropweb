import { createActionType } from "../../redux_util";

export const FETCH_ITEMS = createActionType("FETCH_ITEMS");
export const FETCH_ITEM = createActionType("FETCH_ITEM");
export const FETCH_MARKETS = createActionType("FETCH_MARKETS");
export const FETCH_FARM_ITEMS = createActionType("FETCH_FARM_ITEMS");
export const POST_FARM_ITEM = createActionType("POST_FARM_ITEM");
export const FETCH_CART = createActionType("FETCH_CART");
export const POST_ITEM_TO_CART = createActionType("POST_ITEM_TO_CART");
export const DELETE_ITEM_FROM_CART = createActionType("DELETE_ITEM_FROM_CART");
export const DELETE_ITEM_BY_ID = createActionType("DELETE_ITEM_BY_ID");
export const UPDATE_FARM_ITEM = createActionType("UPDATE_FARM_ITEM");
export const UPDATE_ITEM_IN_CART = createActionType("UPDATE_ITEM_IN_CART");
export const FETCH_CONSUMER_ORDER = createActionType("FETCH_CONSUMER_ORDER");
export const FETCH_PAST_CONSUMER_ORDERS = createActionType(
  "FETCH_PAST_CONSUMER_ORDERS"
);
