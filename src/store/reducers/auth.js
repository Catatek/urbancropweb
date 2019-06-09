// import { Map, fromJS } from 'immutable';
// import {
//   USER_LOGIN,
//   USER_LOGOUT_SUCCESS,
//   FETCH_PROFILE,
//   CHECK_USER_LOGIN,
//   USER_SIGNUP,
//   UPDATE_PROFILE,
//   UPDATE_AVATAR,
//   UPDATE_FARM,
//   FETCH_FARM,
// } from '../types/auth';

// export default (state = Map(), { type, ...action }) => {
//   switch (type) {
//     case USER_LOGIN.SUCCESS:
//       // state = state
//       // .set('authToken', action.authToken)
//       // .set('info', fromJS(action.userInfo));
//       return state;
//     case USER_LOGOUT_SUCCESS:
//       state = Map();
//       return state;
//     case FETCH_PROFILE.SUCCESS:
//       state = state.set('info', fromJS(action.userInfo));
//       return state;
//     case CHECK_USER_LOGIN.SUCCESS:
//       state = state.set('authToken', action.token);
//       return state;
//     case USER_SIGNUP.SUCCESS:
//       state = state.set('info', fromJS(action.userInfo));
//       return state;
//     case UPDATE_PROFILE.SUCCESS:
//       state = state.set('info', fromJS(action.userInfo));
//       return state;
//     case UPDATE_AVATAR.SUCCESS:
//       state = state.setIn(['info', 'avatar'], fromJS(action.userAvatar.avatar));
//       return state;
//     case FETCH_FARM.SUCCESS:
//       state = state.setIn(['info', 'farm'], fromJS(action.farm.farm));
//       return state;
//     case UPDATE_FARM.SUCCESS:
//       state = state.setIn(['info', 'farm'], fromJS(action.farmInfo));
//       return state;
//     default:
//       return state;
//   }
// };
