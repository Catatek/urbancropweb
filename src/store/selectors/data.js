import { createStructuredSelector } from "reselect";
import { List, Map } from "immutable";

export const getMarkets = state => state.getIn(["data", "markets"], List());
export const getItems = state => state.getIn(["data", "items"], List());
export const getItem = state => state.getIn(["data", "item"], Map());
export const getFarm = state => state.getIn(["data", "farm"], Map());
const messages = state => state.get("messages", Map());

// export const getItemName = state =>
//   state.data.getIn(['item', 'item', 'itemName'], '');
// export const getItemCategory = state =>
//   state.data.getIn(['item', 'item', 'category'], '');
// export const getItemDescription = state =>
//   state.data.getIn(['item', 'item', 'description'], '');
// export const getItemImages = state =>
//   state.data.getIn(['item', 'item', 'images'], List());
// export const getItemAttributes = state =>
//   state.data.getIn(['item', 'item', 'attributes'], '');
// export const getItemId = state =>
//   state.data.getIn(['item', 'item', 'itemId'], '');
// export const getItemCost = state =>
//   state.data.getIn(['item', 'item', 'cost'], '');
// export const getItemUnit = state =>
//   state.data.getIn(['item', 'item', 'unit'], '');
// export const getItemQuantity = state =>
//   state.data.getIn(['item', 'item', 'quantity'], '');

// // FARM

// export const getFarmName = state =>
//   state.data.getIn(['item', 'farm', 'farmName'], '');

// export const getFarmCity = state =>
//   state.data.getIn(['item', 'farm', 'city'], '');

// export const getFarmLatLong = state =>
//   state.data.getIn(['item', 'farm', 'location', 'coordinates'], List());

export const getFarmId = state =>
  state.getIn(["data", "item", "farm", "farmId"], "");

// export const getFarmerAvatar = state =>
//   state.data.getIn(['item', 'farm', 'farmer', 'avatar'], '');

// export const getFarmerFirstName = state =>
//   state.data.getIn(['item', 'farm', 'farmer', 'firstName'], '');

// export const getFarmerLastName = state =>
//   state.data.getIn(['item', 'farm', 'farmer', 'lastName'], '');

export const getBasket = state => state.getIn(["data", "cart"], List());
export const getInventory = state => state.getIn(["data", "farmItems"], List());

export const getFavorites = state => state.getIn(["data", "favorites"], List());

export const getFarmOrders = state =>
  state.getIn(["data", "farmOrders"], List());
export const getMarketOrders = state =>
  state.getIn(["data", "marketOrders"], List());
export const getPastFarmOrders = state =>
  state.getIn(["data", "farmPastOrders"], List());
export const getAllMarketFarms = state =>
  state.getIn(["data", "marketFarms"], List());

// CONSUMERS

export const getCurrentOrder = state =>
  state.getIn(["data", "consumerOrder"], "");
export const getPastConsumerOrders = state =>
  state.getIn(["data", "consumerPastOrders"], List());

export const dataSelector = createStructuredSelector({
  markets: getMarkets,
  items: getItems,
  item: getItem,
  basket: getBasket,
  consumerOrder: getCurrentOrder,
  pastConsumerOrders: getPastConsumerOrders,
  favorites: getFavorites,
  messages,
  inventory: getInventory,
  farmOrders: getFarmOrders,
  pastFarmOrders: getPastFarmOrders,
  farm: getFarm,
  marketOrders: getMarketOrders
});
