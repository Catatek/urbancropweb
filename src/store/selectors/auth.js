import { createStructuredSelector } from "reselect";
import { List, Map } from "immutable";

// // USER

export const getUserFirstName = state =>
  state.getIn(["auth", "info", "firstName"], "");
export const getUserLastName = state =>
  state.getIn(["auth", "info", "lastName"], "");
export const getUserEmail = state => state.getIn(["auth", "info", "email"], "");
// export const getUserRole = state => state.auth.getIn(['info', 'role'], '');
export const getUserAvatar = state =>
  state.getIn(["auth", "info", "avatar"], "");
export const getUserMobile = state =>
  state.getIn(["auth", "info", "mobile"], "");

// // FARM

// export const getUserItems = state => state.data.get('farmItems', List());

export const getUserFarmId = state =>
  state.getIn(["auth", "info", "farmId"], null);
export const getUserFarmName = state =>
  state.getIn(["auth", "farm", "farmName"]);
export const getUserFarmEmail = state =>
  state.getIn(["auth", "farm", "email"], "");
export const getUserFarmMobile = state =>
  state.getIn(["auth", "farm", "mobile"], "");

export const getFarmCountry = state =>
  state.getIn(["auth", "farm", "country"], "");
export const getFarmAddressLine1 = state =>
  state.getIn(["auth", "farm", "addrLine1"], "");
export const getFarmAddressLine2 = state =>
  state.getIn(["auth", "farm", "addrLine2"], "");
export const getFarmCity = state => state.getIn(["auth", "farm", "city"], "");
export const getFarmState = state => state.getIn(["auth", "farm", "state"], "");
export const getFarmZipCode = state =>
  state.getIn(["auth", "farm", "zipCode"], "");

// export const getUserFarmLatLong = state =>
//   state.auth.getIn(['info', 'farm', 'location', 'coordinates'], List());

export const authSelector = createStructuredSelector({
  firstName: getUserFirstName,
  lastName: getUserLastName,
  avatar: getUserAvatar,
  mobile: getUserMobile,
  email: getUserEmail,
  farmName: getUserFarmName,
  farmEmail: getUserFarmEmail,
  farmAddress: getFarmAddressLine1,
  farmId: getUserFarmId,
  farmMobile: getUserFarmMobile,
  addrLine1: getFarmAddressLine1,
  addrLine2: getFarmAddressLine2,
  city: getFarmCity,
  state: getFarmState,
  country: getFarmCountry,
  zipCode: getFarmZipCode
});
