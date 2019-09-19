import { createStructuredSelector } from "reselect";
import { List, Map } from "immutable";

// // USER

export const getUserFirstName = state =>
  state.getIn(["auth", "info", "firstName"], "");
export const getUserLastName = state =>
  state.getIn(["auth", "info", "lastName"], "");
// export const getUserEmail = state => state.auth.getIn(['info', 'email'], '');
// export const getUserRole = state => state.auth.getIn(['info', 'role'], '');
export const getUserAvatar = state =>
  state.getIn(["auth", "info", "avatar"], "");
// export const getUserMobile = state => state.auth.getIn(['info', 'mobile'], '');

// // FARM

// export const getUserItems = state => state.data.get('farmItems', List());

// export const getUserFarmId = state =>
//   state.auth.getIn(['info', 'farmId'], null);
// export const getUserFarmName = state =>
//   state.auth.getIn(['info', 'farm', 'farmName']);
// export const getUserFarmEmail = state =>
//   state.auth.getIn(['info', 'farm', 'email'], '');
// export const getUserFarmMobile = state =>
//   state.auth.getIn(['info', 'farm', 'mobile'], '');

// export const getFarmCountry = state =>
//   state.auth.getIn(['info', 'farm', 'country'], '');
// export const getFarmAddressLine1 = state =>
//   state.auth.getIn(['info', 'farm', 'addrLine1'], '');
// export const getFarmAddressLine2 = state =>
//   state.auth.getIn(['info', 'farm', 'addrLine2'], '');
// export const getFarmCity = state =>
//   state.auth.getIn(['info', 'farm', 'city'], '');
// export const getFarmState = state =>
//   state.auth.getIn(['info', 'farm', 'state'], '');
// export const getFarmZipCode = state =>
//   state.auth.getIn(['info', 'farm', 'zipCode'], '');

// export const getUserFarmLatLong = state =>
//   state.auth.getIn(['info', 'farm', 'location', 'coordinates'], List());

export const authSelector = createStructuredSelector({
  firstName: getUserFirstName,
  lastName: getUserLastName,
  avatar: getUserAvatar
});
