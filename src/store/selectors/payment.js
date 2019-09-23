import { createStructuredSelector } from "reselect";
import { List, Map } from "immutable";

// export const getCards = state => state.payment.get('card', Map());

export const getActive = state =>
  state.getIn(["payment", "card", "active"], false);
export const getLast4 = state => state.getIn(["payment", "card", "last4"], "");
export const getBrand = state => state.getIn(["payment", "card", "brand"], "");
export const getExpiry = state =>
  state.getIn(["payment", "card", "expiry"], "");

// export const getIsFetchingCard = state =>
//   state.payment.get('isFetchingCard', false);
// export const getIsDeletingCard = state =>
//   state.payment.get('isDeletingCard', false);
// export const getIsAddingCard = state =>
//   state.payment.get('isAddingCard', false);
// export const getIsModifyingCard = state =>
//   state.payment.get('isModifyingCard', false);

export const paymentSelector = createStructuredSelector({
  active: getActive,
  last4: getLast4,
  brand: getBrand,
  expiry: getExpiry
});
