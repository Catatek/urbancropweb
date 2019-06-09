import { Map, fromJS } from 'immutable';
import { ADD_ACH_DETAILS, FETCH_ACH_DETAILS } from '../types/payout';

export default (state = Map(), { type, ...action }) => {
  switch (type) {
    case ADD_ACH_DETAILS.PENDING:
      return state.set('isAddingACH', true);
    case ADD_ACH_DETAILS.SUCCESS:
      return state
        .set('achDetails', fromJS(action.achDetails))
        .set('isAddingACH', false);
    case ADD_ACH_DETAILS.FAILED:
      return state.set('isAddingACH', false);
    case FETCH_ACH_DETAILS.PENDING:
      return state.set('isFetchingACHDetails', true);
    case FETCH_ACH_DETAILS.SUCCESS:
      return state
        .set('achDetails', fromJS(action.achDetails))
        .set('isFetchingACHDetails', false);
    case FETCH_ACH_DETAILS.FAILED:
      return state.set('isFetchingACHDetails', false);
    default:
      return state;
  }
};
