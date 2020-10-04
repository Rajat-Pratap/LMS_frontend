import React, { Component } from "react";

class ViewMe extends Component {
  bookNameFromId(id) {
    const book = this.props.books.filter((book) => book.bookId === id)[0];
    if (book) {
      return book.name;
    } else return "Book Not Found(404)";
  }
  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">About You</h3>
          <div className="card-body">
            <div className="row">
              <h5> Name:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.props.authenticatedUser.name}
              </div>
            </div>

            <div className="row">
              <h5>Email Id:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.props.authenticatedUser.email}
              </div>
            </div>

            <div className="row">
              <h5>Role/Authority:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.props.authenticatedUser.roles}
              </div>
            </div>

            <div className="row">
              <h5>Book No. 1:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.props.authenticatedUser.bookId1 > 0
                  ? this.bookNameFromId(this.props.authenticatedUser.bookId1)
                  : "Not Issued"}
              </div>
            </div>

            <div className="row">
              <h5>Book No. 2:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.props.authenticatedUser.bookId2 > 0
                  ? this.bookNameFromId(this.props.authenticatedUser.bookId2)
                  : "Not Issued"}
              </div>
            </div>
            <div className="row">
              <h5>Book No. 3:</h5>
              <div style={{ paddingLeft: "40px" }}>
                {this.props.authenticatedUser.bookId3 > 0
                  ? this.bookNameFromId(this.props.authenticatedUser.bookId3)
                  : "Not Issued"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewMe;
