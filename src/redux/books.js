import * as ActionTypes from "./ActionTypes";

export const Books = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_BOOK:
      return state.concat(action.payload);
    case ActionTypes.ADD_BOOKS:
      return action.payload;
    case ActionTypes.UPDATE_BOOK:
      const newBook = action.payload;
      const updatedBooks = state.map((book) => {
        if (book.bookId === newBook.bookId) {
          if (newBook.name) {
            book.name = newBook.name;
          }
          if (newBook.category) {
            book.category = newBook.category;
          }
          if (newBook.qty) {
            book.qty = newBook.qty;
          }
        }
        return book;
      });
      return updatedBooks;
    case ActionTypes.DELETE_BOOK:
      const bookList = state.filter((book) => book.bookId !== action.payload);
      return bookList;
    case ActionTypes.ISSUE_BOOK:
      const updatedBooks2 = state.map((book) => {
        if (book.bookId === action.payload) {
          book.qty = book.qty - 1;
        }
        return book;
      });
      return updatedBooks2;

    case ActionTypes.RETURN_BOOK:
      const updatedBooks3 = state.map((book) => {
        if (book.bookId === action.payload) {
          book.qty = book.qty + 1;
        }
        return book;
      });
      return updatedBooks3;
    default:
      return state;
  }
};
