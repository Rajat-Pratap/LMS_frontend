import { createStore, combineReducers, applyMiddleware } from "redux";
import { Users } from "./users";
import { Books } from "./books";
import { Login } from "./forms";
import { AuthenticatedUser } from "./authenticatedUser";
import { AuthenticationFailed } from "./authenticationFail";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      users: Users,
      books: Books,
      authenticatedUser: AuthenticatedUser,
      authenticationFailed: AuthenticationFailed,
      ...createForms({
        login: Login,
      }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
