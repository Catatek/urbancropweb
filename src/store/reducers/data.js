import { Map, fromJS, List } from "immutable";
import {
  FETCH_MARKETS,
  FETCH_ITEMS,
  FETCH_ITEM,
  FETCH_FARM_ITEMS,
  FETCH_CART,
  DELETE_ITEM_FROM_CART,
  POST_ITEM_TO_CART,
  FETCH_CONSUMER_ORDER,
  FETCH_PAST_CONSUMER_ORDERS,
  UPDATE_ITEM_IN_CART,
  FETCH_ALL_FAVORITES,
  FETCH_FARM_ORDERS,
  FETCH_PAST_FARM_ORDERS,
  FETCH_FARM_BY_ID,
  POST_ORDER,
  FETCH_MARKET_ORDERS,
  FETCH_ALL_FARMS,
  FILTER_ITEMS
} from "../types/data";

export default (state = Map(), { type, ...action }) => {
  switch (type) {
    case FETCH_MARKETS.SUCCESS:
      state = state.set("markets", fromJS(action.markets.markets));
      return state;
    case FETCH_ITEMS.SUCCESS:
      state = state.set("items", fromJS(action.items.items));
      return state;
    case FILTER_ITEMS.SUCCESS:
      state = state.set("items", fromJS(action.items.items));
      return state;
    case FETCH_ITEM.SUCCESS:
      state = state.set("item", fromJS(action.item));
      return state;
    case FETCH_FARM_ITEMS.SUCCESS:
      state = state.set("farmItems", fromJS(action.farmItems.items));
      return state;
    case FETCH_FARM_BY_ID.SUCCESS:
      state = state.set("farm", fromJS(action.farm.farm));
      return state;
    case FETCH_CART.SUCCESS:
      state = state.set("cart", fromJS(action.cart.cart));
      return state;
    case POST_ORDER.SUCCESS:
      state = state.set("cart", List());
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
    case FETCH_MARKET_ORDERS.SUCCESS:
      state = state.set("marketOrders", fromJS(action.marketOrders.orders));
      return state;
    case FETCH_ALL_FARMS.SUCCESS:
      state = state.set("marketFarms", fromJS(action.marketFarms.farms));
      return state;
    case UPDATE_ITEM_IN_CART.SUCCESS:
      state = state.set("cart", fromJS(action.cart.cart));
      return state;
    case FETCH_ALL_FAVORITES.SUCCESS:
      state = state.set("favorites", fromJS(action.favorites.items));
      return state;
    case FETCH_FARM_ORDERS.SUCCESS:
      state = state.set("farmOrders", fromJS(action.farmOrders.orders));
      return state;
    case FETCH_PAST_FARM_ORDERS.SUCCESS:
      state = state.set("farmPastOrders", fromJS(action.farmPastOrders.orders));
      return state;
    default:
      return state;
  }
};
