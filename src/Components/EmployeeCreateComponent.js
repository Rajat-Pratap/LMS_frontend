import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class EmployeeCreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(this.props.match.params.id),
      firstName: "",
      lastName: "",
      email: "",
    };
  }

  componentDidMount() {
    if (this.state.id === -1) return;
    else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        console.log(employee);
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
        });
      });
    }
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveEmployee = (event) => {
    event.preventDefault();
    const { firstName, lastName, email } = this.state;
    let employee = { firstName, lastName, email };
    if (this.state.id === -1) {
      EmployeeService.createEmployee(employee).then((res) => {
        this.props.history.push("/Searchuser");
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
        this.props.history.push("/Searchuser");
      });
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
            <h3 className="text-center">Add/Update Employee</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    placeholder="First name"
                    name="firstName"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    placeholder="Last name"
                    name="lastName"
                    className="form-control"
                    value={this.state.lastName}
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
                <button className="btn btn-success" onClick={this.saveEmployee}>
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

export default EmployeeCreateComponent;
