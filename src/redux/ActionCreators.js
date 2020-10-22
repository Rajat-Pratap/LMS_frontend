import * as ActionTypes from "./ActionTypes";
import axios from "axios";

const BOOKS_API_BASE_URL = "http://localhost:8080/books";
const USER_API_BASE_URL = "http://localhost:8080/users";
let MyInterceptor;

//addUser
export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

//postUser
export const postUser = (user) => (dispatch) => {
  // const newComment = { dishId, rating, author, comment };
  return axios
    .post(USER_API_BASE_URL, user)
    .then((response) => dispatch(addUser(response.data)))
    .catch((error) => {
      console.log("Post user ", error.message);
      alert("New user could not be saved\n Error:" + error.message);
    });
};

//addUsers
export const addUsers = (users) => ({
  type: ActionTypes.ADD_USERS,
  payload: users,
});

//fetchUsers
export const fetchUsers = () => (dispatch) => {
  return axios
    .get(USER_API_BASE_URL)
    .then((res) => dispatch(addUsers(res.data)));
};

//updateUser
export const updateUser = (user, id) => (dispatch) => {
  return axios.put(USER_API_BASE_URL + "/" + id, user).then((res) =>
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: res.data,
    })
  );
};

//deleteUser
export const deleteUser = (id) => (dispatch) => {
  return axios.delete(USER_API_BASE_URL + "/" + id).then(() =>
    dispatch({
      type: ActionTypes.DELETE_USER,
      payload: id,
    })
  );
};

//addBook
export const addBook = (book) => ({
  type: ActionTypes.ADD_BOOK,
  payload: book,
});

//postBook
export const postBook = (book) => (dispatch) => {
  // const newComment = { dishId, rating, author, comment };

  return axios
    .post(BOOKS_API_BASE_URL, book)
    .then((response) => dispatch(addBook(response.data)))
    .catch((error) => {
      console.log("Post book ", error.message);
      alert("Your book could not be saved \n Error:" + error.message);
    });
};

//addBooks
export const addBooks = (books) => ({
  type: ActionTypes.ADD_BOOKS,
  payload: books,
});

//fetchBooks
export const fetchBooks = () => (dispatch) => {
  return axios
    .get(BOOKS_API_BASE_URL)
    .then((res) => dispatch(addBooks(res.data)));
};

//updateBook
export const updateBook = (book, id) => (dispatch) => {
  return axios.put(BOOKS_API_BASE_URL + "/" + id, book).then((res) =>
    dispatch({
      type: ActionTypes.UPDATE_BOOK,
      payload: res.data,
    })
  );
};

//deleteBook
export const deleteBook = (id) => (dispatch) => {
  return axios.delete(BOOKS_API_BASE_URL + "/" + id).then(() =>
    dispatch({
      type: ActionTypes.DELETE_BOOK,
      payload: id,
    })
  );
};

//issueBook
export const issueBook = (userId, bookId) => (dispatch) => {
  return axios
    .get(BOOKS_API_BASE_URL + "/issue/" + userId + "/" + bookId)
    .then((res) => {
      dispatch({
        type: ActionTypes.ISSUE_BOOK,
        payload: bookId,
      });
      dispatch({
        type: ActionTypes.ADD_AUTHENTICATED_USER,
        payload: res.data,
      });
    });
};

//returnBook
export const returnBook = (userId, bookId) => (dispatch) => {
  return axios
    .get(BOOKS_API_BASE_URL + "/return/" + userId + "/" + bookId)
    .then((res) => {
      dispatch({
        type: ActionTypes.RETURN_BOOK,
        payload: bookId,
      });
      dispatch({
        type: ActionTypes.ADD_AUTHENTICATED_USER,
        payload: res.data,
      });
    });
};

export const registerSuccessfulLogin = (username, password, user) => (
  dispatch
) => {
  //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
  setupAxiosInterceptors(createBasicAuthToken(username, password));
  dispatch(addAuthenticatedUser(user));
};

const addAuthenticatedUser = (user) => ({
  type: ActionTypes.ADD_AUTHENTICATED_USER,
  payload: user,
});

export const authFailed = () => (dispatch) => {
  dispatch({
    type: ActionTypes.AUTHENTICATION_FAILED,
    payload: true,
  });
};

const createBasicAuthToken = (username, password) => {
  return "Basic " + window.btoa(username + ":" + password);
};

function setupAxiosInterceptors(token) {
  MyInterceptor = axios.interceptors.request.use((config) => {
    config.headers.authorization = token;
    return config;
  });
}

export const deleteAuthenticatedUser = () => (dispatch) => {
  axios.interceptors.request.eject(MyInterceptor);
  console.log("auth header deleted");
  dispatch({
    type: ActionTypes.DELETE_AUTHENTICATED_USER,
    payload: null,
  });
};
