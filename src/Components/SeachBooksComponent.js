import React, { Component } from "react";

class SearchBooksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };

    this.addBook = this.addBook.bind(this);
  }

  addBook() {
    this.props.history.push("/add-book/-1");
  }

  editBook = (id) => {
    this.props.history.push("/add-book/" + id);
  };

  isBookIssuable(book) {
    return (
      !this.isBookIssued(book.bookId) &&
      book.qty > 0 &&
      (this.props.authenticatedUser.bookId1 === -1 ||
        this.props.authenticatedUser.bookId2 === -1 ||
        this.props.authenticatedUser.bookId3 === -1)
    );
  }

  isBookIssued = (bookId) => {
    if (
      this.props.authenticatedUser.bookId1 === bookId ||
      this.props.authenticatedUser.bookId2 === bookId ||
      this.props.authenticatedUser.bookId3 === bookId
    )
      return true;
    else return false;
  };

  handleSearchChange = (e) => {
    this.setState({ searchString: e.target.value });
  };

  render() {
    const userId = this.props.authenticatedUser.id;
    const filteredBooks = this.props.books.filter((book) => {
      return book.name
        .toLowerCase()
        .includes(this.state.searchString.toLowerCase());
    });

    return (
      <div className="container">
        <h2 className="text-center">Books List</h2>
        <div className="row">
          {this.props.authenticatedUser.roles === "ADMIN" && (
            <button className="btn btn-primary" onClick={this.addBook}>
              Add Book
            </button>
          )}
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search Book"
              value={this.state.searchString}
              onChange={this.handleSearchChange}
            />
          </div>
        </div>
        <div className="row mt-2">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Name</th>
                <th> Category</th>
                <th> Quantity</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.bookId}>
                  <td>{book.name}</td>
                  <td>{book.category}</td>
                  <td>{book.qty}</td>
                  <td>
                    {this.props.authenticatedUser.roles === "ADMIN" && (
                      <button
                        className="btn btn-info"
                        onClick={() => this.editBook(book.bookId)}
                      >
                        <span className="fa fa-edit"></span>
                      </button>
                    )}
                    {this.props.authenticatedUser.roles === "ADMIN" && (
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.props.deleteBook(book.bookId)}
                      >
                        <span className="fa fa-trash"></span>
                      </button>
                    )}
                    {this.props.authenticatedUser && this.isBookIssuable(book) && (
                      <button
                        className="btn btn-warning"
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          this.props.issueBook(userId, book.bookId)
                        }
                      >
                        <span className="fa fa-plus-circle"></span>
                      </button>
                    )}
                    {this.props.authenticatedUser &&
                      this.isBookIssued(book.bookId) && (
                        <button
                          className="btn btn-warning"
                          style={{ marginLeft: "10px" }}
                          onClick={() =>
                            this.props.returnBook(userId, book.bookId)
                          }
                        >
                          <span className="fa fa-minus-circle"></span>
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SearchBooksComponent;
