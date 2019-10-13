import { Map } from "immutable";
import { createStructuredSelector } from "reselect";

export const getIsFetchingACHDetails = state =>
  state.getIn(["payout", "isFetchingACHDetails"], false);
export const getIsAddingACHDetails = state =>
  state.getIn(["payout", "isAddingACHDetails"], false);
export const getIsFetchingACHBalance = state =>
  state.getIn(["payout", "isFetchingACHBalance"], false);

export const getACHDetails = state =>
  state.getIn(["payout", "achDetails"], Map());
export const getACHBalance = state => state.getIn(["payout", "achBalance"], "");

export const payoutSelector = createStructuredSelector({
  achDetails: getACHDetails,
  achBalance: getACHBalance
});
