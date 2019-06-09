import {
  sendingRequest,
  receivedResponse,
  createAction
} from "../../redux_util";
import {
  postLogin
  // postForgotPassword,
  // postResetPassword,
  // getProfile,
  // postSignup,
  // postActivateuser,
  // postProfile,
  // postFarmDetails,
  // getCode,
  // postAvatar,
  // getFarm,
} from "../../services/api";
import {
  USER_LOGIN
  // USER_LOGOUT,
  // FETCH_PROFILE,
  // CHECK_USER_LOGIN,
  // USER_SIGNUP,
  // ACTIVATE_USER,
  // UPDATE_PROFILE,
  // RESEND_CODE,
  // FORGOT_PASSWORD,
  // RESET_PASSWORD,
  // UPDATE_AVATAR,
  // UPDATE_FARM,
  // FETCH_FARM,
} from "../types/auth";

const userLoginRequest = createAction(USER_LOGIN.PENDING);
const userLoginFailed = createAction(USER_LOGIN.FAILED, "error");
const userLoginSuccess = createAction(
  USER_LOGIN.SUCCESS,
  "userInfo"
  // 'authToken',
  // 'message',
);
export const userLogin = data => async dispatch => {
  console.log(data);

  dispatch(userLoginRequest());
  try {
    const res = await postLogin(data);
    // const token = res.data.authorization;
    console.log(res);

    return Promise.resolve(
      dispatch(
        userLoginSuccess()
        // res.data.user,
        // res.data.authorization,
        // res.data.message,
      )
    );
  } catch (error) {
    return Promise.reject(dispatch(userLoginFailed(error)));
  }
};

// const userLogoutSuccess = createAction(USER_LOGOUT.SUCCESS);
// export const userLogout = () => async dispatch => {
//   return dispatch(userLogoutSuccess());
// };

// const fetchProfileSuccess = createAction(FETCH_PROFILE.SUCCESS, 'userInfo');
// export const fetchProfile = () => async dispatch => {
//   dispatch(sendingRequest('FETCH_PROFILE.PENDING'));
//   try {
//     const res = await getProfile();
//     return dispatch(fetchProfileSuccess(res.data));
//   } catch (err) {
//     return dispatch(receivedResponse('FETCH_PROFILE.FAILED', err));
//   }
// };

// const checkUserLoginSuccess = createAction(CHECK_USER_LOGIN.SUCCESS, 'token');
// const checkUserLoginPending = createAction(CHECK_USER_LOGIN.PENDING);
// const checkUserLoginFailed = createAction(CHECK_USER_LOGIN.FAILED, 'error');
// export const checkUserLogin = () => async dispatch => {
//   dispatch(checkUserLoginPending());
//   try {
//     const token = await getAuthToken();
//     if (token) {
//       return dispatch(checkUserLoginSuccess(token));
//     } else {
//       return dispatch(checkUserLoginFailed('missing token'));
//     }
//   } catch (error) {
//     return dispatch(checkUserLoginFailed(error));
//   }
// };

// // const resendCodeSuccess = createAction(RESEND_CODE.SUCCESS, 'code');
// // const resendCodePending = createAction(RESEND_CODE.PENDING);
// // const resendCodeFailed = createAction(RESEND_CODE.FAILED, 'error');
// // export const resendCode = data => async dispatch => {
// //   dispatch(resendCodePending());
// //   try {
// //     const res = await getCode(data);
// //     return dispatch(resendCodeSuccess(res.data, 'Success'));
// //   } catch (error) {
// //     return dispatch(resendCodeFailed(error));
// //   }
// // };

// // const forgotPasswordSuccess = createAction(FORGOT_PASSWORD.SUCCESS, 'message');
// // const forgotPasswordPending = createAction(FORGOT_PASSWORD.PENDING);
// // const forgotPasswordFailed = createAction(FORGOT_PASSWORD.FAILED, 'error');
// // export const forgotPassword = data => async dispatch => {
// //   dispatch(forgotPasswordPending());
// //   try {
// //     const res = await postForgotPassword(data);
// //     return dispatch(forgotPasswordSuccess(res.data, 'Success'));
// //   } catch (error) {
// //     return dispatch(forgotPasswordFailed(error));
// //   }
// // };

// // const resetPasswordSuccess = createAction(RESET_PASSWORD.SUCCESS, 'message');
// // const resetPasswordPending = createAction(RESET_PASSWORD.PENDING);
// // const resetPasswordFailed = createAction(RESET_PASSWORD.FAILED, 'error');
// // export const resetPassword = data => async dispatch => {
// //   dispatch(resetPasswordPending());
// //   try {
// //     const res = await postResetPassword(data);
// //     return dispatch(resetPasswordSuccess(res.data, 'Success'));
// //   } catch (error) {
// //     return dispatch(resetPasswordFailed(error));
// //   }
// // };

// // SIGN UP
// const userSignupSuccess = createAction(
//   USER_SIGNUP.SUCCESS,
//   'userInfo',
//   'message',
// );
// const userSignupFailed = createAction(USER_SIGNUP.FAILED, 'error');
// const userSignupPending = createAction(USER_SIGNUP.PENDING);
// export const userSignup = data => async dispatch => {
//   dispatch(userSignupPending());
//   try {
//     const res = await postSignup(data);
//     const token = res.headers['authorization'];
//     const role = 'consumer';
//     await storeAsyncValues(token, role);
//     return dispatch(userSignupSuccess(res.data, 'Signup Successful'));
//   } catch (error) {
//     return dispatch(userSignupFailed(error));
//   }
// };

// // // ACTIVATE ACCOUNT
// // const activateUserSuccess = createAction(
// //   ACTIVATE_USER.SUCCESS,
// //   'userInfo',
// //   'message',
// // );
// // const activateUserFailed = createAction(ACTIVATE_USER.FAILED, 'error');
// // const activateUserPending = createAction(ACTIVATE_USER.PENDING);
// // export const activateUser = data => async dispatch => {
// //   dispatch(activateUserPending());
// //   try {
// //     const res = await postActivateuser(data);
// //     return dispatch(activateUserSuccess(res.data, 'Activation Successful'));
// //   } catch (error) {
// //     return dispatch(activateUserFailed(error));
// //   }
// // };

// // UPDATE PROFILE
// const updateProfilePending = createAction(UPDATE_PROFILE.PENDING);
// const updateProfileSuccess = createAction(UPDATE_PROFILE.SUCCESS, 'userInfo');
// const updateProfileFailed = createAction(UPDATE_PROFILE.FAILED, 'error');
// export const updateProfile = data => async dispatch => {
//   dispatch(updateProfilePending());
//   try {
//     const res = await postProfile(data);
//     return dispatch(updateProfileSuccess(res.data));
//   } catch (error) {
//     return dispatch(updateProfileFailed(error));
//   }
// };

// const updateAvatarPending = createAction(UPDATE_AVATAR.PENDING);
// const updateAvatarSuccess = createAction(UPDATE_AVATAR.SUCCESS, 'userAvatar');
// const updateAvatarFailed = createAction(UPDATE_AVATAR.FAILED, 'error');
// export const updateAvatar = data => async dispatch => {
//   dispatch(updateAvatarPending());
//   try {
//     const res = await postAvatar(data);
//     return dispatch(updateAvatarSuccess(res.data));
//   } catch (error) {
//     return dispatch(updateAvatarFailed(error));
//   }
// };

// const updateFarmPending = createAction(UPDATE_FARM.PENDING);
// const updateFarmSuccess = createAction(UPDATE_FARM.SUCCESS, 'farmInfo');
// const updateFarmFailed = createAction(UPDATE_FARM.FAILED, 'error');
// export const updateFarm = (farmId, data) => async dispatch => {
//   dispatch(updateFarmPending());
//   try {
//     const res = await postFarmDetails(farmId, data);
//     return dispatch(updateFarmSuccess(res.data));
//   } catch (error) {
//     return dispatch(updateFarmFailed(error));
//   }
// };

// const fetchFarmPending = createAction(FETCH_FARM.PENDING);
// const fetchFarmSuccess = createAction(FETCH_FARM.SUCCESS, 'farm');
// const fetchFarmFailed = createAction(FETCH_FARM.FAILED, 'error');
// export const fetchFarm = farmId => async dispatch => {
//   dispatch(fetchFarmPending());
//   try {
//     const res = await getFarm(farmId);
//     return dispatch(fetchFarmSuccess(res.data));
//   } catch (error) {
//     return dispatch(fetchFarmFailed(error));
//   }
// };
