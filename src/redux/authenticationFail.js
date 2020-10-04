import * as ActionTypes from "./ActionTypes";

export const AuthenticationFailed = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_FAILED:
      return action.payload;
    default:
      return state;
  }
};
