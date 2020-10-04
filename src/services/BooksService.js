import axios from "axios";

const BOOKS_API_BASE_URL = "http://localhost:8080/books";

class BookService {
  getBooks() {
    return axios.get(BOOKS_API_BASE_URL);
  }

  createBook(book) {
    return axios.post(BOOKS_API_BASE_URL, book);
  }

  getBookById(id) {
    return axios.get(BOOKS_API_BASE_URL + "/" + id);
  }

  updateBook(book, id) {
    return axios.put(BOOKS_API_BASE_URL + "/" + id, book);
  }

  deleteBook(id) {
    return axios.delete(BOOKS_API_BASE_URL + "/" + id);
  }

  issueBook(userId, bookId) {
    return axios.get(BOOKS_API_BASE_URL + "/issue/" + userId + "/" + bookId);
  }

  returnBook(userId, bookId) {
    return axios.get(BOOKS_API_BASE_URL + "/return/" + userId + "/" + bookId);
  }
}

export default new BookService();
