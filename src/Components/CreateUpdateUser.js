import React, { Component } from "react";

class CreateUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      newPassword: "",
    };
  }

  componentDidMount() {
    if (this.props.id === -1) return;
    else {
      console.log(this.props.user);
      this.setState({
        name: this.props.user.name,
        email: this.props.user.email,
      });
    }
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveUser = (event) => {
    event.preventDefault();
    const { name, newPassword, email } = this.state;
    let user = { name, password: newPassword, email };
    if (this.props.id === -1) {
      this.props.postUser(user);
      this.props.history.push("/");
    } else {
      if (!user.name) {
        user.name = this.props.user.name;
      }
      if (!user.email) user.email = this.props.user.email;
      user.bookId1 = this.props.user.bookId1;
      user.bookId2 = this.props.user.bookId2;
      user.bookId3 = this.props.user.bookId3;

      this.props.updateUser(user, this.props.id);
      this.props.history.push("/");
    }
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Add/Update User</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Name</label>
                  <input
                    placeholder="Name"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Email Id</label>
                  <input
                    placeholder="Email Id"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <label> New Password</label>
                  <input
                    placeholder="New Password"
                    name="newPassword"
                    className="form-control"
                    value={this.state.newPassword}
                    onChange={this.changeHandler}
                  />
                </div>

                <button className="btn btn-success" onClick={this.saveUser}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUpdateUser;
