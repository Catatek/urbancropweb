import { createActionType } from "../../redux_util";

export const FETCH_ITEMS = createActionType("FETCH_ITEMS");
export const FETCH_ITEM = createActionType("FETCH_ITEM");
export const FETCH_MARKETS = createActionType("FETCH_MARKETS");
export const FETCH_FARM_ITEMS = createActionType("FETCH_FARM_ITEMS");
export const POST_FARM_ITEM = createActionType("POST_FARM_ITEM");
export const FETCH_CART = createActionType("FETCH_CART");
export const FETCH_FARM_BY_ID = createActionType("FETCH_FARM_BY_ID");
export const POST_ITEM_TO_CART = createActionType("POST_ITEM_TO_CART");
export const DELETE_ITEM_FROM_CART = createActionType("DELETE_ITEM_FROM_CART");
export const DELETE_ITEM_BY_ID = createActionType("DELETE_ITEM_BY_ID");
export const UPDATE_FARM_ITEM = createActionType("UPDATE_FARM_ITEM");
export const UPDATE_ITEM_IN_CART = createActionType("UPDATE_ITEM_IN_CART");
export const FETCH_CONSUMER_ORDER = createActionType("FETCH_CONSUMER_ORDER");
export const FETCH_PAST_CONSUMER_ORDERS = createActionType(
  "FETCH_PAST_CONSUMER_ORDERS"
);
export const FETCH_MARKET_ORDERS = createActionType("FETCH_MARKET_ORDERS");
export const FETCH_ALL_FARMS = createActionType("FETCH_ALL_FARMS");
export const POST_ORDER = createActionType("POST_ORDER");
export const POST_FAVORITE = createActionType("POST_FAVORITE");
export const DELETE_FAVORITE = createActionType("DELETE_FAVORITE");
export const FETCH_FAVORITE = createActionType("FETCH_FAVORITE");
export const FETCH_ALL_FAVORITES = createActionType("FETCH_ALL_FAVORITES");

export const FULLFILL_ORDER = createActionType("FULLFILL_ORDER");
export const FETCH_FARM_ORDERS = createActionType("FETCH_FARM_ORDERS");
export const FETCH_PAST_FARM_ORDERS = createActionType(
  "FETCH_PAST_FARM_ORDERS"
);
