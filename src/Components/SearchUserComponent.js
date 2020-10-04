import React, { Component } from "react";

class SearchUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };

    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    console.log(this.props.users);
  }

  addUser() {
    this.props.history.push("/add-user/-1");
  }

  editUser = (id) => {
    this.props.history.push("/add-user/" + id);
  };

  viewUser = (id) => {
    this.props.history.push("/view-user/" + id);
  };

  handleSearchChange = (e) => {
    this.setState({ searchString: e.target.value });
  };

  render() {
    var filteredUsers;
    if (this.props.users.length)
      filteredUsers = this.props.users.filter((user) => {
        return user.email
          .toLowerCase()
          .includes(this.state.searchString.toLowerCase());
      });

    return (
      <div className="container">
        <h2 className="text-center">Users List</h2>
        <div className="row">
          <div className="col col-2">
            <button className="btn btn-primary" onClick={this.addUser}>
              Add User
            </button>
          </div>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search User"
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
                <th> Email Id</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers &&
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => this.editUser(user.id)}
                      >
                        <span className="fa fa-edit"></span>
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.props.deleteUser(user.id)}
                      >
                        <span className="fa fa-trash"></span>
                      </button>
                      <button
                        className="btn btn-warning"
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.viewUser(user.id)}
                      >
                        <span className="fa fa-eye"></span>
                      </button>
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

export default SearchUserComponent;
