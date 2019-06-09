import { Map, fromJS } from 'immutable';
import {
  FETCH_CARDS,
  DELETE_CARD,
  ADD_CARD,
  MODIFY_CARD,
} from '../types/payment';

export default (state = Map(), { type, ...action }) => {
  switch (type) {
    case FETCH_CARDS.SUCCESS:
      state = state
        .set('card', fromJS(action.card))
        .set('isFetchingCard', false);
      return state;
    case FETCH_CARDS.PENDING:
      state = state.set('isFetchingCard', true);
      return state;
    case FETCH_CARDS.FAILED:
      state = state
        .set('isFetchingCard', false)
        .set('error', fromJS(action.error));
      return state;
    case DELETE_CARD.PENDING:
      state = state.set('isDeletingCard', true);
      return state;
    case DELETE_CARD.SUCCESS:
      state = state
        .set('card', fromJS(action.card))
        .set('isDeletingCard', false);
      return state;
    case DELETE_CARD.FAILED:
      state = state.set('isDeletingCard', false).set('error', action.error);
      return state;
    case ADD_CARD.PENDING:
      state = state.set('isAddingCard', true);
      return state;
    case ADD_CARD.SUCCESS:
      state = state.set('isAddingCard', false).set('card', fromJS(action.card));
      return state;
    case ADD_CARD.FAILED:
      state = state
        .set('isAddingCard', false)
        .set('error', fromJS(action.error));
      return state;
    case MODIFY_CARD.PENDING:
      state = state.set('isModifyingCard', true);
      return state;
    case MODIFY_CARD.SUCCESS:
      state = state
        .set('isModifyingCard', false)
        .set('card', fromJS(action.card));
      return state;
    case MODIFY_CARD.FAILED:
      state = state
        .set('isModifyingCard', false)
        .set('error', fromJS(action.error));
      return state;
    default:
      return state;
  }
};
