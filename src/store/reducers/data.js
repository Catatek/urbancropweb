import { Map, fromJS } from "immutable";
import {
  FETCH_MARKETS,
  FETCH_ITEMS,
  FETCH_ITEM,
  FETCH_FARM_ITEMS,
  FETCH_CART,
  DELETE_ITEM_FROM_CART,
  POST_ITEM_TO_CART,
  UPDATE_FARM_ITEM,
  FETCH_FARM,
  FETCH_CONSUMER_ORDER,
  FETCH_PAST_CONSUMER_ORDERS,
  UPDATE_ITEM_IN_CART,
  FETCH_ALL_FAVORITES
} from "../types/data";

export default (state = Map(), { type, ...action }) => {
  switch (type) {
    case FETCH_MARKETS.SUCCESS:
      state = state.set("markets", fromJS(action.markets.markets));
      return state;
    case FETCH_ITEMS.SUCCESS:
      state = state.set("items", fromJS(action.items.items));
      return state;
    case FETCH_ITEM.SUCCESS:
      state = state.set("item", fromJS(action.item));
      return state;
    case FETCH_FARM_ITEMS.SUCCESS:
      state = state.set("farmItems", fromJS(action.farmItems.items));
      return state;
    case FETCH_CART.SUCCESS:
      state = state.set("cart", fromJS(action.cart.cart));
      return state;
    case POST_ITEM_TO_CART.SUCCESS:
      state = state.set("cart", fromJS(action.cart.cart));
      return state;
    case DELETE_ITEM_FROM_CART.SUCCESS:
      state = state.set("cart", fromJS(action.cart.cart));
      return state;
    case FETCH_CONSUMER_ORDER.SUCCESS:
      state = state.set("consumerOrder", fromJS(action.consumerOrder.orders));
      return state;
    case FETCH_PAST_CONSUMER_ORDERS.SUCCESS:
      state = state.set(
        "consumerPastOrders",
        fromJS(action.consumerPastOrders.orders)
      );
      return state;
    case UPDATE_ITEM_IN_CART.SUCCESS:
      state = state.set("cart", fromJS(action.cart.cart));
      return state;
    case FETCH_ALL_FAVORITES.SUCCESS:
      state = state.set("favorites", fromJS(action.favorites.items));
      return state;
    default:
      return state;
  }
};
