import { fromJS, Map } from "immutable";
export function createAction(type, ...argNames) {
  return function(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const HTTP_SENDING_REQUEST = "HTTP_SENDING_REQUEST";
export const HTTP_RECEIVED_RESPONSE = "HTTP_RECEIVED_RESPONSE";
export const HTTP_CLEAR_REQUEST = "HTTP_CLEAR_REQUEST";

export function sendingRequest(name) {
  return {
    type: HTTP_SENDING_REQUEST,
    name
  };
}

export function receivedResponse(name, response = null, type = null) {
  const action = {
    type: HTTP_RECEIVED_RESPONSE,
    name
  };
  if (response) {
    action.response = response;
    if (type && response.message) {
      console.log(response.message, "<----");
    }
  }
  return action;
}

export function clearRequest(name) {
  return { type: HTTP_CLEAR_REQUEST, name };
}

export const SET_MESSAGE = "SET_MESSAGE";
export const setMessage = createAction(SET_MESSAGE, "id", "details");

export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const clearMessage = createAction(CLEAR_MESSAGE, "id");

export const showMessage = (id, details) => {
  return dispatch => {
    details.id = id;
    dispatch(setMessage(id, details));
    setTimeout(() => {
      dispatch(clearMessage(id));
    }, 3000);
  };
};

export function Messages(state = Map(), action) {
  switch (action.type) {
    case SET_MESSAGE:
      return state.set(action.id, action.details);
    case CLEAR_MESSAGE:
      return state.delete(action.id);
    default:
      return state;
  }
}

export function httpReducer(state = Map(), action) {
  switch (action.type) {
    case HTTP_SENDING_REQUEST:
      return state.setIn(["requests", action.name], fromJS({ loading: true }));
    case HTTP_RECEIVED_RESPONSE: {
      let response;
      if (action.response) response = action.response;
      state = state.setIn(["requests", action.name, "loading"], false);
      return state.setIn(
        ["requests", action.name, "response"],
        fromJS(response)
      );
    }
    case HTTP_CLEAR_REQUEST:
      return state.deleteIn(["requests", action.name]);
    default:
      return state;
  }
}

export const isLoading = (state, actionName) =>
  state.getIn(["http", "requests", actionName, "loading"], false);

export const createActionType = value => ({
  SUCCESS: `${value}_SUCCESS`,
  PENDING: `${value}_PENDING`,
  FAILED: `${value}_FAILED`
});
