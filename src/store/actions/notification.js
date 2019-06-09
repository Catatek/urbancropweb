// import {
//   sendingRequest,
//   receivedResponse,
//   createAction,
// } from '../../redux_util';
// import { getNotifications } from '../../services/api';
// import { FETCH_NOTIFICATIONS } from '../types/notification';

// const fetchNotificationRequest = () =>
//   createAction(FETCH_NOTIFICATIONS.PENDING);
// const fetchNotificationSuccess = notifications =>
//   createAction(FETCH_NOTIFICATIONS.SUCCESS, 'notifications');
// const fetchNotificationFailed = error =>
//   createAction(FETCH_NOTIFICATIONS.FAILED, 'error');

// export const fetchNotificationsAction = () => async dispatch => {
//   dispatch(fetchNotificationRequest());
//   try {
//     const res = await getNotifications();
//     console.log(res);
//     return dispatch(fetchNotificationSuccess(res.data));
//   } catch (error) {
//     return dispatch(fetchNotificationFailed(error));
//   }
// };
