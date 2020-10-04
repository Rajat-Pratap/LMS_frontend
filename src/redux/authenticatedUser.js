import * as ActionTypes from "./ActionTypes";

export const AuthenticatedUser = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_AUTHENTICATED_USER:
      return action.payload;
    case ActionTypes.DELETE_AUTHENTICATED_USER:
      return {};
    default:
      return state;
  }
};
