// import { Map, fromJS } from 'immutable';
// import {
//   FETCH_MARKETS,
//   FETCH_ITEMS,
//   FETCH_ITEM,
//   FETCH_FARM_ITEMS,
//   FETCH_CART,
//   DELETE_ITEM_FROM_CART,
//   POST_ITEM_TO_CART,
//   UPDATE_FARM_ITEM,
//   FETCH_FARM,
// } from '../types/data';

// export default (state = Map(), { type, ...action }) => {
//   switch (type) {
//     case FETCH_MARKETS.SUCCESS:
//       state = state.set('markets', fromJS(action.markets.markets));
//       return state;
//     case FETCH_ITEMS.SUCCESS:
//       state = state.set('items', fromJS(action.items.items));
//       return state;
//     case FETCH_ITEM.SUCCESS:
//       state = state.set('item', fromJS(action.item));
//       return state;
//     case FETCH_FARM_ITEMS.SUCCESS:
//       state = state.set('farmItems', fromJS(action.farmItems.items));
//       return state;
//     case FETCH_CART.SUCCESS:
//       state = state.set('cart', fromJS(action.cart.cart));
//       return state;
//     case POST_ITEM_TO_CART.SUCCESS:
//       state = state.set('cart', fromJS(action.cart.cart));
//       return state;
//     case DELETE_ITEM_FROM_CART.SUCCESS:
//       state = state.set('cart', fromJS(action.cart.cart));
//       return state;

//     default:
//       return state;
//   }
// };
