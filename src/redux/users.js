import * as ActionTypes from "./ActionTypes";

export const Users = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return state.concat(action.payload);
    case ActionTypes.ADD_USERS:
      return action.payload;
    case ActionTypes.UPDATE_USER:
      const newUser = action.payload;
      const updatedUsers = state.map((user) => {
        if (user.id === newUser.id) {
          if (newUser.name) {
            user.name = newUser.name;
          }
          if (newUser.email) {
            user.email = newUser.email;
          }
        }
        return user;
      });
      return updatedUsers;
    case ActionTypes.DELETE_USER:
      const usersList = state.filter((user) => user.id !== action.payload);
      return usersList;
    default:
      return state;
  }
};
