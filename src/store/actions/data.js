import { createAction } from "../../redux_util";
import {
  FETCH_ITEMS,
  FETCH_ITEM,
  FETCH_MARKETS,
  FETCH_FARM_ITEMS,
  // POST_FARM_ITEM,
  FETCH_CART,
  POST_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  DELETE_ITEM_BY_ID,
  UPDATE_FARM_ITEM,
  DELETE_FAVORITE,
  POST_FAVORITE,
  FETCH_FAVORITE,
  FETCH_ALL_FAVORITES,
  UPDATE_ITEM_IN_CART,
  FETCH_CONSUMER_ORDER,
  FETCH_PAST_CONSUMER_ORDERS,
  POST_ORDER,
  FETCH_FARM_ORDERS,
  FULLFILL_ORDER,
  FETCH_PAST_FARM_ORDERS,
  FETCH_FARM_BY_ID
} from "../types/data";
import {
  getItems,
  getItem,
  getMarkets,
  getFarmItems,
  // postFarmItem,
  getCart,
  postItemToCart,
  deleteItemFromCart,
  deleteItemById,
  putFarmItem,
  putItemInCart,
  getConsumerOrder,
  getPastConsumerOrders,
  postOrder,
  postFavorite,
  removeFavorite,
  getFavorite,
  getAllFavorites,
  getFarmOrders,
  fullfillOrder,
  getPastFarmOrders,
  getFarmById
} from "../../services/api";

// // GET ITEMS

const fetchItemsPending = createAction(FETCH_ITEMS.PENDING);
const fetchItemsSuccess = createAction(FETCH_ITEMS.SUCCESS, "items");
const fetchItemsFailed = createAction(FETCH_ITEMS.FAILED, "error");
export const fetchItems = data => async dispatch => {
  dispatch(fetchItemsPending());
  try {
    const res = await getItems(data);
    return dispatch(fetchItemsSuccess(res.data));
  } catch (error) {
    return dispatch(fetchItemsFailed(error));
  }
};

const fetchItemPending = createAction(FETCH_ITEM.PENDING);
const fetchItemSuccess = createAction(FETCH_ITEM.SUCCESS, "item");
const fetchItemFailed = createAction(FETCH_ITEM.FAILED, "error");
export const fetchItem = data => async dispatch => {
  dispatch(fetchItemPending());
  try {
    const res = await getItem(data);
    return dispatch(fetchItemSuccess(res.data));
  } catch (error) {
    return dispatch(fetchItemFailed(error));
  }
};

const fetchFarmItemsPending = createAction(FETCH_FARM_ITEMS.PENDING);
const fetchFarmItemsSuccess = createAction(
  FETCH_FARM_ITEMS.SUCCESS,
  "farmItems"
);
const fetchFarmItemsFailed = createAction(FETCH_FARM_ITEMS.FAILED, "error");
export const fetchFarmItems = data => async dispatch => {
  dispatch(fetchFarmItemsPending());
  try {
    const res = await getFarmItems(data);
    return dispatch(fetchFarmItemsSuccess(res.data));
  } catch (error) {
    return dispatch(fetchFarmItemsFailed(error));
  }
};

// // ADD ITEM

// const addFarmItemPending = createAction(POST_FARM_ITEM.PENDING);
// const addFarmItemSuccess = createAction(POST_FARM_ITEM.SUCCESS, 'items');
// const addFarmItemFailed = createAction(POST_FARM_ITEM.FAILED, 'error');
// export const addFarmItem = (data, farm) => async dispatch => {
//   dispatch(addFarmItemPending());
//   try {
//     const res = await postFarmItem(data, farm);
//     return dispatch(addFarmItemSuccess(res.data));
//   } catch (error) {
//     return dispatch(addFarmItemFailed(error));
//   }
// };

// // UPDATE ITEM

const updateFarmItemPending = createAction(UPDATE_FARM_ITEM.PENDING);
const updateFarmItemSuccess = createAction(UPDATE_FARM_ITEM.SUCCESS, "items");
const updateFarmItemFailed = createAction(UPDATE_FARM_ITEM.FAILED, "error");
export const updateFarmItem = (data, id) => async dispatch => {
  dispatch(updateFarmItemPending());
  try {
    const res = await putFarmItem(data, id);
    return dispatch(updateFarmItemSuccess(res.data));
  } catch (error) {
    return dispatch(updateFarmItemFailed(error));
  }
};

// // CART

const fetchCartPending = createAction(FETCH_CART.PENDING);
const fetchCartSuccess = createAction(FETCH_CART.SUCCESS, "cart");
const fetchCartFailed = createAction(FETCH_CART.FAILED, "error");
export const fetchCart = () => async dispatch => {
  dispatch(fetchCartPending());
  try {
    const res = await getCart();
    return dispatch(fetchCartSuccess(res.data));
  } catch (error) {
    return dispatch(fetchCartFailed(error));
  }
};

const addItemToCartPending = createAction(POST_ITEM_TO_CART.PENDING);
const addItemToCartSuccess = createAction(POST_ITEM_TO_CART.SUCCESS, "cart");
const addItemToCartFailed = createAction(POST_ITEM_TO_CART.FAILED, "error");
export const addItemToCart = (item, data) => async dispatch => {
  dispatch(addItemToCartPending());
  try {
    const res = await postItemToCart(item, data);
    return dispatch(addItemToCartSuccess(res.data));
  } catch (error) {
    return dispatch(addItemToCartFailed(error));
  }
};

const updateItemInCartPending = createAction(UPDATE_ITEM_IN_CART.PENDING);
const updateItemInCartSuccess = createAction(
  UPDATE_ITEM_IN_CART.SUCCESS,
  "cart"
);
const updateItemInCartFailed = createAction(
  UPDATE_ITEM_IN_CART.FAILED,
  "error"
);
export const updateItemInCart = (item, data) => async dispatch => {
  dispatch(updateItemInCartPending());
  try {
    const res = await putItemInCart(item, data);
    return dispatch(updateItemInCartSuccess(res.data));
  } catch (error) {
    return dispatch(updateItemInCartFailed(error));
  }
};

const removeItemFromCartPending = createAction(DELETE_ITEM_FROM_CART.PENDING);
const removeItemFromCartSuccess = createAction(
  DELETE_ITEM_FROM_CART.SUCCESS,
  "cart"
);
const removeItemFromCartFailed = createAction(
  DELETE_ITEM_FROM_CART.FAILED,
  "error"
);
export const removeItemFromCart = item => async dispatch => {
  dispatch(removeItemFromCartPending());
  try {
    const res = await deleteItemFromCart(item);
    return dispatch(removeItemFromCartSuccess(res.data));
  } catch (error) {
    return dispatch(removeItemFromCartFailed(error));
  }
};

const createOrderPending = createAction(POST_ORDER.PENDING);
const createOrderSuccess = createAction(POST_ORDER.SUCCESS, "orders");
const createOrderFailed = createAction(POST_ORDER.FAILED, "error");
export const createOrder = () => async dispatch => {
  dispatch(createOrderPending());
  try {
    const res = await postOrder();
    return dispatch(createOrderSuccess(res.data));
  } catch (error) {
    return dispatch(createOrderFailed(error));
  }
};

// MARKETS
const fetchMarketsPending = createAction(FETCH_MARKETS.PENDING);
const fetchMarketsSuccess = createAction(FETCH_MARKETS.SUCCESS, "markets");
const fetchMarketsFailed = createAction(FETCH_MARKETS.FAILED, "error");
export const fetchMarkets = data => async dispatch => {
  dispatch(fetchMarketsPending());
  try {
    const res = await getMarkets(data);
    return dispatch(fetchMarketsSuccess(res.data));
  } catch (error) {
    return dispatch(fetchMarketsFailed(error));
  }
};

// // DELETE ITEM

const removeItemByIdPending = createAction(DELETE_ITEM_BY_ID.PENDING);
const removeItemByIdSuccess = createAction(DELETE_ITEM_BY_ID.SUCCESS, "cart");
const removeItemByIdFailed = createAction(DELETE_ITEM_BY_ID.FAILED, "error");
export const removeItemById = (item, farm) => async dispatch => {
  dispatch(removeItemByIdPending());
  try {
    const res = await deleteItemById(item, farm);
    return dispatch(removeItemByIdSuccess(res.data));
  } catch (error) {
    return dispatch(removeItemByIdFailed(error));
  }
};

// ORDERS

const fetchConsumerOrderPending = createAction(FETCH_CONSUMER_ORDER.PENDING);
const fetchConsumerOrderSuccess = createAction(
  FETCH_CONSUMER_ORDER.SUCCESS,
  "consumerOrder"
);
const fetchConsumerOrderFailed = createAction(
  FETCH_CONSUMER_ORDER.FAILED,
  "error"
);
export const fetchConsumerOrder = () => async dispatch => {
  dispatch(fetchConsumerOrderPending());
  try {
    const res = await getConsumerOrder();
    return dispatch(fetchConsumerOrderSuccess(res.data));
  } catch (error) {
    return dispatch(fetchConsumerOrderFailed(error));
  }
};

const fetchPastConsumerOrdersPending = createAction(
  FETCH_PAST_CONSUMER_ORDERS.PENDING
);
const fetchPastConsumerOrdersSuccess = createAction(
  FETCH_PAST_CONSUMER_ORDERS.SUCCESS,
  "consumerPastOrders"
);
const fetchPastConsumerOrdersFailed = createAction(
  FETCH_PAST_CONSUMER_ORDERS.FAILED,
  "error"
);
export const fetchPastConsumerOrders = () => async dispatch => {
  dispatch(fetchPastConsumerOrdersPending());
  try {
    const res = await getPastConsumerOrders();
    return dispatch(fetchPastConsumerOrdersSuccess(res.data));
  } catch (error) {
    return dispatch(fetchPastConsumerOrdersFailed(error));
  }
};

// FAVORITES

const addFavoritePending = createAction(POST_FAVORITE.PENDING);
const addFavoriteSuccess = createAction(POST_FAVORITE.SUCCESS, "favorites");
const addFavoriteFailed = createAction(POST_FAVORITE.FAILED, "error");
export const addFavorite = data => async dispatch => {
  dispatch(addFavoritePending());
  try {
    const res = await postFavorite(data);
    return dispatch(addFavoriteSuccess(res.data));
  } catch (error) {
    return dispatch(addFavoriteFailed(error));
  }
};

const deleteFavoritePending = createAction(DELETE_FAVORITE.PENDING);
const deleteFavoriteSuccess = createAction(
  DELETE_FAVORITE.SUCCESS,
  "favorites"
);
const deleteFavoriteFailed = createAction(DELETE_FAVORITE.FAILED, "error");
export const deleteFavorite = data => async dispatch => {
  dispatch(deleteFavoritePending());
  try {
    const res = await removeFavorite(data);
    return dispatch(deleteFavoriteSuccess(res.data));
  } catch (error) {
    return dispatch(deleteFavoriteFailed(error));
  }
};

const fetchFavoritePending = createAction(FETCH_FAVORITE.PENDING);
const fetchFavoriteSuccess = createAction(FETCH_FAVORITE.SUCCESS, "favorites");
const fetchFavoriteFailed = createAction(FETCH_FAVORITE.FAILED, "error");
export const fetchFavorite = () => async dispatch => {
  dispatch(fetchFavoritePending());
  try {
    const res = await getFavorite();
    return dispatch(fetchFavoriteSuccess(res.data));
  } catch (error) {
    return dispatch(fetchFavoriteFailed(error));
  }
};

const fetchAllFavoritesPending = createAction(FETCH_ALL_FAVORITES.PENDING);
const fetchAllFavoritesSuccess = createAction(
  FETCH_ALL_FAVORITES.SUCCESS,
  "favorites"
);
const fetchAllFavoritesFailed = createAction(
  FETCH_ALL_FAVORITES.FAILED,
  "error"
);
export const fetchAllFavorites = () => async dispatch => {
  dispatch(fetchAllFavoritesPending());
  try {
    const res = await getAllFavorites();
    return dispatch(fetchAllFavoritesSuccess(res.data));
  } catch (error) {
    return dispatch(fetchAllFavoritesFailed(error));
  }
};

// FARM

const fetchFarmOrdersPending = createAction(FETCH_FARM_ORDERS.PENDING);
const fetchFarmOrdersSuccess = createAction(
  FETCH_FARM_ORDERS.SUCCESS,
  "farmOrders"
);
const fetchFarmOrdersFailed = createAction(FETCH_FARM_ORDERS.FAILED, "error");
export const fetchFarmOrders = farmId => async dispatch => {
  dispatch(fetchFarmOrdersPending());
  try {
    const res = await getFarmOrders(farmId);
    return dispatch(fetchFarmOrdersSuccess(res.data));
  } catch (error) {
    return dispatch(fetchFarmOrdersFailed(error));
  }
};

const fetchPastFarmOrdersPending = createAction(FETCH_PAST_FARM_ORDERS.PENDING);
const fetchPastFarmOrdersSuccess = createAction(
  FETCH_PAST_FARM_ORDERS.SUCCESS,
  "farmPastOrders"
);
const fetchPastFarmOrdersFailed = createAction(
  FETCH_PAST_FARM_ORDERS.FAILED,
  "error"
);
export const fetchPastFarmOrders = farmId => async dispatch => {
  dispatch(fetchPastFarmOrdersPending());
  try {
    const res = await getPastFarmOrders(farmId);
    return dispatch(fetchPastFarmOrdersSuccess(res.data));
  } catch (error) {
    return dispatch(fetchPastFarmOrdersFailed(error));
  }
};

const postFullfillOrderPending = createAction(FULLFILL_ORDER.PENDING);
const postFullfillOrderSuccess = createAction(
  FULLFILL_ORDER.SUCCESS,
  "fullfill"
);
const postFullfillOrderFailed = createAction(FULLFILL_ORDER.FAILED, "error");
export const postFullfillOrder = (order, data) => async dispatch => {
  dispatch(postFullfillOrderPending());
  try {
    const res = await fullfillOrder(order, data);
    return dispatch(postFullfillOrderSuccess(res.data));
  } catch (error) {
    return dispatch(postFullfillOrderFailed(error));
  }
};

const fetchFarmByIdPending = createAction(FETCH_FARM_BY_ID.PENDING);
const fetchFarmByIdSuccess = createAction(FETCH_FARM_BY_ID.SUCCESS, "farm");
const fetchFarmByIdFailed = createAction(FETCH_FARM_BY_ID.FAILED, "error");
export const fetchFarmById = farmId => async dispatch => {
  dispatch(fetchFarmByIdPending());
  try {
    const res = await getFarmById(farmId);
    return dispatch(fetchFarmByIdSuccess(res.data));
  } catch (error) {
    return dispatch(fetchFarmByIdFailed(error));
  }
};
