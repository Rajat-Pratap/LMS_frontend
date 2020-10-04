import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoginCoponent2 from "./LoginCoponent2";
import LogoutComponent from "./LogoutComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import SearchUserComponent from "./SearchUserComponent";
import SearchBooksComponent from "./SeachBooksComponent";
import UpdateBooksComponent from "./UpdateBooksComponent";
import ViewUserComponent from "./ViewUserComponent";
import MenuComponent from "./Menu Component";
import CreateUpdateUser from "./CreateUpdateUser";
import ViewMe from "./ViewMe";
import {
  returnBook,
  issueBook,
  postBook,
  postUser,
  fetchBooks,
  fetchUsers,
  updateBook,
  updateUser,
  deleteBook,
  deleteUser,
  registerSuccessfulLogin,
  authFailed,
  deleteAuthenticatedUser,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    users: state.users,
    books: state.books,
    authenticatedUser: state.authenticatedUser,
    authenticationFailed: state.authenticationFailed,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postUser: (user) => dispatch(postUser(user)),
  updateUser: (user, id) => dispatch(updateUser(user, id)),
  deleteUser: (id) => dispatch(deleteUser(id)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchBooks: () => dispatch(fetchBooks()),
  postBook: (book) => dispatch(postBook(book)),
  updateBook: (book, id) => dispatch(updateBook(book, id)),
  deleteBook: (id) => dispatch(deleteBook(id)),
  issueBook: (userId, bookId) => dispatch(issueBook(userId, bookId)),
  returnBook: (userId, bookId) => dispatch(returnBook(userId, bookId)),
  authFailed: () => dispatch(authFailed()),
  registerSuccessfulLogin: (username, password, user) =>
    dispatch(registerSuccessfulLogin(username, password, user)),
  deleteAuthenticatedUser: () => dispatch(deleteAuthenticatedUser()),
});

class InstructorApp extends Component {
  render() {
    return (
      <>
        {this.props.authenticatedUser.name && (
          <MenuComponent
            deleteAuthenticatedUser={this.props.deleteAuthenticatedUser}
            authenticatedUser={this.props.authenticatedUser}
            fetchUsers={this.props.fetchUsers}
            fetchBooks={this.props.fetchBooks}
          />
        )}
        <Switch>
          <AuthenticatedRoute
            authenticatedUser={this.props.authenticatedUser}
            path="/"
            exact
            component={() => (
              <ViewMe
                authenticatedUser={this.props.authenticatedUser}
                books={this.props.books}
              />
            )}
          />
          <Route
            path="/login"
            exact
            component={() => (
              <LoginCoponent2
                history={this.props.history}
                registerSuccessfulLogin={this.props.registerSuccessfulLogin}
                authenticationFailed={this.props.authenticationFailed}
                authFailed={this.props.authFailed}
              />
            )}
          />
          <AuthenticatedRoute
            authenticatedUser={this.props.authenticatedUser}
            path="/logout"
            exact
            component={LogoutComponent}
          />
          <AuthenticatedRoute
            authenticatedUser={this.props.authenticatedUser}
            path="/Searchuser"
            exact
            component={() => (
              <SearchUserComponent
                users={this.props.users}
                deleteUser={this.props.deleteUser}
                history={this.props.history}
              />
            )}
          />
          <AuthenticatedRoute
            authenticatedUser={this.props.authenticatedUser}
            path="/Searchbook"
            exact
            component={() => (
              <SearchBooksComponent
                history={this.props.history}
                books={this.props.books}
                authenticatedUser={this.props.authenticatedUser}
                issueBook={this.props.issueBook}
                returnBook={this.props.returnBook}
                deleteBook={this.props.deleteBook}
              />
            )}
          />
          <AuthenticatedRoute
            authenticatedUser={this.props.authenticatedUser}
            exact
            path="/add-user/:id"
            component={({ match }) => (
              <CreateUpdateUser
                id={parseInt(match.params.id, 10)}
                history={this.props.history}
                updateUser={this.props.updateUser}
                user={
                  this.props.users.filter(
                    (user) => user.id === parseInt(match.params.id, 10)
                  )[0]
                }
                postUser={this.props.postUser}
              />
            )}
          />
          <AuthenticatedRoute
            authenticatedUser={this.props.authenticatedUser}
            exact
            path="/add-book/:id"
            component={({ match }) => (
              <UpdateBooksComponent
                id={parseInt(match.params.id, 10)}
                history={this.props.history}
                updateBook={this.props.updateBook}
                book={
                  this.props.books.filter(
                    (book) => book.bookId === parseInt(match.params.id, 10)
                  )[0]
                }
                postBook={this.props.postBook}
              />
            )}
          />
          <AuthenticatedRoute
            authenticatedUser={this.props.authenticatedUser}
            exact
            path="/view-user/:id"
            component={({ match }) => (
              <ViewUserComponent
                user={
                  this.props.users.filter(
                    (user) => user.id === parseInt(match.params.id, 10)
                  )[0]
                }
                books={this.props.books}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InstructorApp)
);
