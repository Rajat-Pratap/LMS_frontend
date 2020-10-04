import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class MenuComponent extends Component {
  componentDidMount() {
    this.props.fetchBooks();
    this.props.fetchUsers();
  }

  logOut = () => {
    this.props.deleteAuthenticatedUser();
  };

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark text-center">
          <Link className="nav-link" to="/">
            LMS
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Me
              </NavLink>
            </li>
            {this.props.authenticatedUser.roles === "ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/Searchuser">
                  Users
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/Searchbook">
                Books
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {this.props.authenticatedUser && (
              <li>
                <Link className="nav-link" to="/logout" onClick={this.logOut}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default MenuComponent;
